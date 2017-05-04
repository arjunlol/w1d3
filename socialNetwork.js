var dataBase = {
  data: {
    f01: {
      name: "Alice",
      age: 15,
      follows: ["f02", "f03", "f04"]
    },
    f02: {
      name: "Bob",
      age: 20,
      follows: ["f05", "f06"]
    },
    f03: {
      name: "Charlie",
      age: 35,
      follows: ["f01", "f04", "f06"]
    },
    f04: {
      name: "Debbie",
      age: 40,
      follows: ["f01", "f02", "f03", "f05", "f06"]
    },
    f05: {
      name: "Elizabeth",
      age: 45,
      follows: ["f04"]
    },
    f06: {
      name: "Finn",
      age: 25,
      follows: ["f05"]
    }
  },
  relationships: {

  },
  convert : {

  },
  findEveryonePlusFollows: function (){
    for (var key in this.data){
      // would work only if names are unique
      this.relationships[this.data[key].name] = {"Follows": this.findWhoYouFollow(this.data[key])};
      this.convert[this.data[key].name] = key;
    }
    for (var key in this.relationships){  // this key is different from the previous key, maybe name them differently, so u dont get confused
      for (var i of this.relationships[key].Follows){
        var j = 0;
        if (!this.relationships[i].Followers) this.relationships[i].Followers = []; // this can also be at line 43: {Followers: []}
        this.relationships[i].Followers.push(key);
        j++;
      }
    }

    console.log(this.relationships, this.convert)
  },
  findWhoYouFollow: function (personKey){
    var whoYouFollow = [];
    for (var i = 0; i < personKey.follows.length; i++){
      whoYouFollow.push(this.data[personKey.follows[i]].name);
    }
    return whoYouFollow;
  },
  findWhoFollowsMost: function (){
    var longest = "";
    var longestLength = 0;
    for (var key in this.relationships){
      if (this.relationships[key].Follows.length > longestLength) {
        longest = key;
        longestLength = this.relationships[key].Follows.length;
      }
    }
    console.log(longest); // what if more than one users follows the most?
  },
  findWhoHasMost: function (){
    var longest = "";
    var longestLength = 0;
    for (var key in this.relationships){
      if (this.relationships[key].Followers.length > longestLength) {
        longest = key;
        longestLength = this.relationships[key].Followers.length;
      }
    }
    console.log(longest); // what if more than one users has the most followers
  },
  findWhoHasMost30: function (){
    var longest = "";
    var longestLength = 0;
    for (var key in this.relationships){
      var j = 0;
      for (var i of this.relationships[key].Followers){

        if(this.data[this.convert[i]].age > 30) j++;
      }
      if (j > longestLength) {
        longest = key;
        longestLength = j;
      }
    }
    console.log(longest); // same as prev
  },
  findWhoFollowsMost30: function (){
    var longest = "";
    var longestLength = 0;
    for (var key in this.relationships){
      var j = 0;
      for (var i of this.relationships[key].Follows){

        if(this.data[this.convert[i]].age > 30) j++;
      }
      if (j > longestLength) {
        longest = key;
        longestLength = j;
      }
    }
    console.log(longest); // same as prev
  },
  whoFollowButDont: function (){
    for (var key in this.relationships){
      for (var i = 0; i < this.relationships[key].Follows.length; i++){
        if(this.relationships[key].Followers.indexOf(this.relationships[key].Follows[i]) == -1){
          console.log(key + " follows "+ this.relationships[key].Follows[i] + " but they don't follow back.");
        }
      }
    }
  },
  listReach: function (){
    var reach = 0;
    for (var key in this.relationships){
      reach = this.relationships[key].Followers.length;
      for (var i = 0; i < this.relationships[key].Followers.length; i++){
        reach += this.relationships[this.relationships[key].Followers[i]].Followers.length;
      }
      console.log(key + ": " + reach);
    }

  }
};


// List everyone and for each of them, list the names of who they follow and who follows them
dataBase.findEveryonePlusFollows();
// Identify who follows the most people
dataBase.findWhoFollowsMost();
// Identify who has the most followers
dataBase.findWhoHasMost();
// Identify who has the most followers over 30
dataBase.findWhoHasMost30();
// Identify who follows the most people over 30
dataBase.findWhoFollowsMost30();
// List those who follow someone that doesn't follow them back
dataBase.whoFollowButDont();
// List everyone and their reach (sum of # of followers and # of followers of followers)
dataBase.listReach();
// Tips: - feel free to create lots of helper functions - some of the tasks are much harder than others - the Underscore library can help (but is not necessary)


