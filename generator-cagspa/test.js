var alo = 'this projectName'.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
});
alo = alo.replace(/\s+/g, ' ')
console.log(alo);
