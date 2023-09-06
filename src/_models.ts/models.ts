
export class Room {
    x: number = -1;
    y: number = -1;

    title: string = "";
    img_id: string = "";
    exit: Boolean[] = [false, false, false, false];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    set(title: string = "", img_id: string = "") {
        this.title = title;
        this.img_id = img_id;
    }

    public imgpath () {
        return "./assets/images/back" + this.img_id.toString() + ".jpg";
    }

    setExit(dir: number, setTo: Boolean = true) : void {
        this.exit[dir] = setTo;
    }

}



export class PlayerStats {
    intelligence: number = 0;
    charisma: number = 0;
    strength: number = 0;

    constructor(int: number, cha: number, str: number) { 
        this.intelligence = int;
        this.charisma = cha;
        this.strength = str;    
    }
}

export class RequiredStats {
    stat: string = "";
    value: number = 0;

    constructor(stat: string, value: number) {
        this.stat = stat;
        this.value = value;
    }
}

export class Choices {
    text: string = "";
    nextScenarioId: number = 0;
    //requiredStats: RequiredStats;

    constructor(text: string, nextscenarioid: number) {
        this.text = text;
        this.nextScenarioId = nextscenarioid;
        //this.requiredStats = requiredstats;
    }

}

export class Scenario {
    id: number;
    title: string = "";
    description: string = "";
    choices: Choices[] = [];

    constructor(id: number, title: string, description: string, choices: Choices[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.choices = choices;
    }

    public imgpath () {
        return "./assets/images/back" + this.id.toString() + ".jpg";
    }
}


    /*
    // generate random string for id. may not be actually needed
    private random_id(length: Number = 12) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    */





    /*
    // generate random string for id. may not be actually needed
    private random_id(length: Number = 12) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    */

