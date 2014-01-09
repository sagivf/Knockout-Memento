﻿ko.MCT = (function () {
    var mStacks = [];

    var getMStacks = function(){
        return mStacks;
    };
    var purgeMStacks = function(){
        mStacks.forEach(function(stack){
            stack.clearForGc();
        });
        mStacks.length = 0;
    };
    var createNewMStack = function(dependancies, settings){
        dependancies =  dependancies || {};
        dependancies.errHandler = ko.MCT.ErrorHandler;
        var newStack = new ko.MCT.MStack(dependancies, settings);
        mStacks.push(newStack);
        return newStack;

    };
    var killMStack = function(stack){
        var indexOf = mStacks.indexOf(stack);
        if (indexOf == -1)
            return false;
        stack.clearForGc();
        mStacks.splice(indexOf, 1);

    };
    var getDefaultStack = function(){
        if(mStacks.length > 0)
            return mStacks[0];
        else
            return createNewMStack();
    };
    return {
        getMStacks:getMStacks,
        killMStack:killMStack,
        purgeMStacks:purgeMStacks,
        getDefaultStack:getDefaultStack,
        createNewMStack:createNewMStack
    };
})();