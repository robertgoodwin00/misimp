


// chat message that goes to the backend server when submitting a message by socket
export class ChatMessage {
    username: string = "";
    //userid: string = "";
    msgtext: string = "";
    

    constructor(username: string, message: string) { //, oobstring: string = "") {
        //this.userid = userid;  // e.g. 47 (the database assigned id)
        this.username = username;  // e.g. johnA7823fuUP73
        this.msgtext = message;
       
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

}