import { Component, HostListener, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class TextboxComponent {

  messages: string[] = ["you","me","me me me", "and me too","how about me?"];  // incoming messages
  needscrolldown: Boolean = false;

  newMessage(message: string) {
    //this.message = 'fufu is a fluff';
   
    if (!message)
      message = "";

    console.log('new message:' + message);
   
    if (message != "")
      this.messages.push(message);

    this.needscrolldown = true;
  }

  // replace carriage returns with <br/>  do we even need this?
  processMessage(mess: string) {
    if (mess)
      return mess.replace(new RegExp('\n', 'g'), "<br />");
    else
      return mess;
  }

  // scroll to the bottom whenever a new chat message should appear
  // (ngAfterViewChecked is called within the Angular life cycle)
  ngAfterViewChecked() {
    if (this.needscrolldown) {
      this.needscrolldown = false;
      this.scroll_to_bottom();
    }
    
  }

  // scroll to the bottom (most recent message) of the chat
  scroll_to_bottom() {
    var scrollview = document.getElementById("scrollview");
    if (scrollview)
      scrollview.scrollTop = scrollview.scrollHeight;
  }

  /*
  // listen for keyboard input
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (event.key=="q") {
      this.newMessage('fufu');
    }
  }
  */

}
