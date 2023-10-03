
export class Room {
    x: number = -1;
    y: number = -1;
    exit: Boolean[] = [false, false, false, false];

    title: string = "";
    img_id: string = "";

    cat: number = 1;
    event_id: number = -1;
    event_available: Boolean = false;
    

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    set(title: string = "", img_id: string = "", event_id: number = -1) {
        this.title = title;
        this.img_id = img_id;
        this.event_id = event_id;
    }

    public imgpath () {
        return "./assets/backs/back" + this.img_id + ".jpg";
    }

    

    setExit(dir: number, setTo: Boolean = true) : void {
        this.exit[dir] = setTo;
    }



    // allow for 5 digit numbers
    setEvent(id: number, cat: number) {
        this.cat = cat;
        this.event_id = id;
        switch (cat) {
            case 1: this.event_id += 10000; break;
            case 2: this.event_id += 20000; break;
            case 3: this.event_id += 30000; break;
        }
        this.event_available = true;
    }

    getEventIdString() {
        if (this.event_id < 10) {
            return "0000" + this.event_id.toString();
        } else if (this.event_id < 100) {
            return "000" + this.event_id.toString();
        } else if (this.event_id < 1000) {
            return "00" + this.event_id.toString();
        } else if (this.event_id < 10000) {
            return "0" + this.event_id.toString();
        } else {
            return this.event_id.toString();
        }
    }
    
    public eventpath (upOne: Boolean = false, thumb: Boolean = false) {
        let path = (upOne) ? "../assets/events/" : "./assets/events/";
        let thumb_string = thumb ? "thumbs/thumb" : "";
        let catpath = "";
        let stri = "";
        switch(this.cat) {
            case 1: catpath = "1s/"; break;
            case 2: catpath = "2s/"; break;
            case 3: catpath = "3s/"; break;
            default: 
        }
        return  path + catpath + thumb_string + this.getEventIdString() + ".jpg";
    }

    turnOffEvent() {
        this.event_available = false;
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

