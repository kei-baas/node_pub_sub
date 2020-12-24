function person(name, skill) {
    this.name = name;
    this.skill = skill;

    this.pubs = [];
    this.subs = [];
    this.id = Math.random() * 10000;
    //id mocking
}

person.prototype.setName = function(newName) {
    // name setter for the publisher
    let someValue = newName || false;
    if (someValue) {
        this.name = someValue;
        return this;
    }

    return this;
    // return this without any changes
};

person.prototype.getName = function() {
    if (this.name) {
        return this.name;
    }
    return null;
};

person.prototype.setSkill = function(newSkill) {
    let someValue = newSkill || false;

    if (someValue) {
        this.age = someValue;
        return this;
    }

    return this;
};

person.prototype.getSkill = function() {
    if (this.skill) {
        return this.skill;
    }
    return null;
};

person.prototype.getId = function() {
    if (this.id) {
        return this.id;
    }

    this.id = Math.random() * 10000;
    return this.id;
};

person.prototype.newPublish = function(obj) {
    let pubs = this.getPubs();
    pubs.push(obj);
    this.setPubs(pubs);
};

person.prototype.setPubs = function(newStatePub) {
    this.pubs = newStatePub;
};

person.prototype.getPubs = function() {
    if (this.pubs) {
        return this.pubs;
    }
    return [];
    //console.log(empty arr return from the pubs);  !!!!
};

person.prototype.getSubs = function() {
    if (this.subs) {
        return this.subs;
    }
    return [];
};

person.prototype.pushNewSub = function(value) {
    this.subs.push(value);
};

person.prototype.generateSubId = function(min, max) {
    return Math.random(min, max);
};

person.prototype.checkForAnotherRandom = function(notBe, spec) {
    let _new = Math.floor(Math.random() * (spec.max - spec.min) + spec.min);

    if (notBe != _new) {
        return _new;
    }

    this.checkForAnotherRandom(notBe, spec);
};

person.prototype.occuranceDetector = function(number, arr) {
    let vals = arr;

    this.occuranceDetector.generateResult = function() {
        let numberOfTimes = 0;
        for (let i = 0; i < vals.length; i++) {
            if (vals[i] == number) {
                numberOfTimes = numberOfTimes + 1;
            }
        }

        return {
            [number]: number,
            occurTimes: numberOfTimes
        };
    };

    return this.occuranceDetector;
};

person.prototype.generateAllRandomAtOnce = function(numberOfRands) {
    let allRands = [];
    for (let counter = 0; counter < numberOfRands; counter++) {
        rand = Math.floor(Math.random() * (numberOfRands - 0) + 0);
        allRands.push(rand);
    }

    return allRands;
};

person.prototype.generateHash = function(randomNumber) {
    let rand;
    let arrVersion = Array.from(randomNumber.toString());
    let keyCounter = Math.floor(arrVersion.length - 3);

    let randoms = this.generateAllRandomAtOnce(keyCounter);

    for (let counter = 0; counter < keyCounter; counter++) {
        let res = this.occuranceDetector(randoms[counter], randoms).generateResult();

        if (res[randoms[counter]] != undefined) {
            if (res.occurTimes > 1) {
                rand = this.checkForAnotherRandom(res[rand], { max: keyCounter, min: 0 });
                arrVersion[rand] = "#";
            }
            arrVersion[res[counter]] = "#";
        }
    }

    return arrVersion.join("", arrVersion);
};

person.prototype.listenOn = function(personTarget, WhatYouHaveAsSubs, idToListenOn) {
    let change;
    let currentArrayFromId = this.find(WhatYouHaveAsSubs, idToListenOn);



    console.log('------------------------------------------------------------here------------');
     console.log(personTarget.getPubs());

    console.log('------------------------------------------------------------------------');

    console.log(currentArrayFromId);

    console.log('------------------------------------------------------------------------');
    // while(true) {
    //
    //
    //     change = this.trackChanges(personTarget.getPubs(), currentArrayFromId);
    //     if (change != "NC") {
    //
    //         console.log("aere we here");
    //         console.log("this is the changes", change);
    //         this.mergeChanges(WhatYouHaveAsSubs,change,idToListenOn);
    //     }
    //
    // }

        // here we done the merge after we got some change and we listen for another changes

};

person.prototype.mergeChanges = function(subsArr, newArrayChanges, id) {
    // this will produce some sides
    let targetObject = this.find(subsArr, id);
    if (newArrayChanges instanceof Array) {
        newArrayChanges.forEach(item => {
            targetObject[0].body.personPubs.push(item);
        });
    }
};

person.prototype.subscribe = function(personToSub) {
    let newSubId = this.generateHash(personToSub.getId());
    this.pushNewSub({
        id: newSubId,
        body: {
            name: personToSub.getName(),
            personPubs: personToSub.getPubs()
        }
    });

    // console.log(this.getSubs());

    // we need to find the personToSub

    // need some while true

    //
    // let OldRecordedPubs = this.find(this.getSubs(), personToSub.getId());
    // console.log(OldRecordedPubs,'this is from the find fun');
    // if (OldRecordedPubs) {
    //     //track for the changes
    //     //between the two subs
    //
    //     let changesTrack = this.trackChanges(OldRecordedPubs, personToSub.getPubs());
    //     if (changesTrack == "NC") {
    //         // means no changes;
    //         console.log(" there is no changes and we feel great");
    //         return;
    //     }
    //
    //     console.log(changesTrack);
    //     // we need to marge the changes to our subscribe
    //     // we have some refreshing here; for the new subscribe name refreshing
    // }
};

person.prototype.find = function(subsArr, id) {
    let targetSub = subsArr.filter(sub => sub.id == id);
    console.log(typeof targetSub);

    if (targetSub) {
        return targetSub;
    }

    console.log("not found");
    return false;
};



person.prototype.deepEquality = function(obj1,obj2) {
    let keys = Object.keys(obj1);
    let len = keys.length;
    let truthLen = 0;

    for(item of keys) {
        if(obj1[item] == obj2[item]) {
            truthLen++;
        }
    }

    if(len == truthLen) {
        return true
    }

    return false;

}


person.prototype.trackChanges = function(old, _new) {
    let changes = [];
    let state;
    if (this.typeCheckEquality("array", old, _new)) {
        for (let i = 0; i < _new.length; i++) {
            console.log(old[i], "this is fucking old i");
            if (old[i] != undefined) {
                if (this.deepEquality(_new[i], old[i])) {
                    // here means nothing is changes
                    state = "NC";
                    //NC stands for not changes
                } else {
                    changes.push(_new[i]);

                    state = "C";
                    // the new is changes but not extended;
                }
            } else {
                // we have some changes in the new the new is extended but not changes
                changes.push(_new[i]);
                state = "EC";
                // C stands for changes;
            }
        }
    }

    if (state == "NC") {
        return "NC";
    }
    console.log(state);

    return changes;
    // changes can be EC or C at the same time;
};

person.prototype.typeCheckEquality = function(type, ...values) {
    // type equality check among diff values
    if (type == undefined || values == undefined) {
        throw new Error("unexpected type or argument set");
        return false;
    }

    let state = [];
    switch (type) {
        case "array":
            values.forEach(item => {
                if (item instanceof Array) {
                    state.push(true);
                } else {
                    state.push(false);
                }
            });

            break;

        case "string":
            values.forEach(item => {
                if (typeof item == "string") {
                    state.push(true);
                } else {
                    state.push(false);
                }
            });

            break;

        case "object":
            values.forEach(item => {
                if (typeof item == "object" || item instanceof Object) {
                    state.push(true);
                } else {
                    state.push(false);
                }
            });

            break;

        default:
            state = false;
    }

    if (state instanceof Array) {
        let lentime = 0;
        let stLen = state.length;

        for (item of state) {
            if (item == true) {
                lentime++;
            }
        }
        if (lentime == stLen) {
            return true;
            // here means all the same
        }

        return false;
    }

    // here means false and were are in the default;
    return state;
};

exports.per = person;
