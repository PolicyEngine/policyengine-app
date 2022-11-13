

export function removePerson(situation, name) {
    // Remove a person from the situation
    delete situation.people[name];
    for (const entityPlural of Object.keys(situation)) {
        if (entityPlural !== "people") {
            for (const entity of Object.keys(situation[entityPlural])) {
                situation[entityPlural][entity].members = situation[entityPlural][entity].members.filter(member => member != name);
            }
        }
    }
    return situation;
}

export function addYearlyVariables(situation, variables, entities) {
    // Add yearly variables to the situation (with their input value if they are an input variable, else null).
    let entityPlural;
    let possibleEntities;
    for (const variable of Object.values(variables)) {
        if (variable.definitionPeriod == "year") {
            entityPlural = entities[variable.entity].plural;
            if (entityPlural in situation) {
                possibleEntities = Object.keys(situation[entityPlural]);
                for (const entity of possibleEntities) {
                    if (!(variable.name in situation[entityPlural][entity])) {
                        situation[entityPlural][entity][variable.name] = {
                            "2022": variable.isInputVariable ? variable.defaultValue : null,
                        };
                    }
                }
            }
        }
    }
    return situation;
}