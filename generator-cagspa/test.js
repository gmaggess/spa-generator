var alo = 'this.projectName'.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
});
console.log(alo);
