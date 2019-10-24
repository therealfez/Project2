// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $exampleSource = $("#example-source");
var $exampleTag = $("#example-tag");
var $submitBtn = $("#submit");
// var $checkBtn = $("#checkSource");
var $signup = $("#signup");
var $login = $("#login");
var $exampleList = $("#example-list");
var sources = [];
var reliability;

// if(localStorage.getItem("email") {
//   //toggle some hidden item to show
// } else {
//   //dont toggle block access
// }

localStorage.removeItem("email");
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },
  getSources: function() {
    return $.ajax({
      url: "/api/sources",

      type: "GET"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim(),
    source: $exampleSource.val().trim(),
    tag: $exampleTag.val().trim(),
    reliable: reliability
  };

  if (!(example.text && example.description && example.source && example.tag)) {
    alert("You must enter an example text, description, source and tags!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
  $exampleSource.val("");
  $exampleTag.val("");
};

function findSources(srcName) {
  var filteredSources = [];
  var keys = Object.keys(sources);

  //console.log("src name", srcName);
  //console.log("keys", keys);
  for (var i = 0; i < keys.length; i++) {
    //console.log(keys[i]);

    if (keys[i].startsWith(srcName)) {
      filteredSources.push({
        name: keys[i],
        srcName: sources[keys[i]][0]
      });
    }
  }
  //console.log(filteredSources[0].srcName.type);
  return filteredSources;
}

var handleCheckSource = function(event) {
  console.log("check source");
  event.preventDefault();
  API.getSources().then(function(data) {
    var srcName = $exampleSource.val();
    console.log("SRCNAME", srcName);
    sources = data;
    console.log(findSources(srcName));

    // this is the code that pulls out the type needed from the search
    var poop = findSources(srcName);
    // console.log(poop[0].srcName.type);
    if ((poop = "undefined")) {
      reliability = "reliable";
    } else {
      reliability = poop[0].srcName.type;
    }
    console.log(poop);
    // where my new code ends
    handleFormSubmit(event);
  });
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

var handleSignUp = function(event) {
  event.preventDefault();
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();

  var newUser = {
    email: email,
    password: password
  };

  $.post("/api/signup", newUser, function(data) {
    if (data) {
      $.post("/api/login", newUser, function() {
        alert("User created and logged in successfully");
        localStorage.setItem("email", newUser.email);
        window.location.href = "../home";
      });
    } else {
      alert();
    }
  });
};

var handleLogIn = function(event) {
  event.preventDefault();
  var email = $("#email")
    .val()
    .trim();
  var password = $("#password")
    .val()
    .trim();

  var dbUser = {
    email: email,
    password: password
  };
  $.post("/api/login/", dbUser, function(loginData) {
    if (loginData) {
      console.log(loginData);
      window.location.href = "../home";
    } else if (!loginData) {
      alert("email or password do not match");
    }
  });
};

// Add event listeners to the submit and delete buttons

$submitBtn.on("click", handleCheckSource);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
// $checkBtn.on("click", handleCheckSource);
$signup.on("click", handleSignUp);
// Add a new user to database
$login.on("click", handleLogIn);
//check for user in database and see if email and password match

API.getSources().then(function(data) {
  // console.log(data);
  sources = data;
});
