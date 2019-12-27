import React from 'react';
import * as ReactDOM from "react-dom";
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective, AccordionAnimationSettings } from '@syncfusion/ej2-react-navigations';

class HelpPage extends React.Component {
  content0() {
      return <div>
      Click Create event in home page.Then feed the event topic and event description.Click Create and Click Confirm.
    </div>;
  }
  content1() {
      return <div>
      Choose your Interested Event and Click join event . Then Sign In with your syncfusion credential and Click Confirm. 
    </div>;
  }
  content2() {
      return <div>
      You can't create or join an event without registration in Bytes Club .
    </div>;
  }
  content3() {
     return <div>
     In home page ,Click Request Event in the top rigth .A request dialog box will be appear, in that you can submit your suggestion topics to conduct. 
    </div>;
  }
content4() {
      return <div>
      Yes you can. Go to your event page and Click reschedule Event in the top rigth.Choose your fixable date and rise a reschedule request. 
    </div>;
  }
content5() {
      return <div>
      Go to your event page and click Edit. Click Cancel Event in the bottom left. Click Cancel Event or Delete Event. Click Confirm.
    </div>;
  }

  render() {
      return (<AccordionComponent expandMode='Single' height='550'>
          <AccordionItemsDirective>
            <AccordionItemDirective header='How do I create a syncfusion event?' content={this.content0}/>
            <AccordionItemDirective header=' How do I join an event?' content={this.content1}/>
            <AccordionItemDirective header='Can I join without registration?' content={this.content2}/>
            <AccordionItemDirective header='How do I request to conduct event about needy topics?'        content={this.content3}/>
            <AccordionItemDirective header='Can I reschedule my fixed event?' content={this.content4}/>
            <AccordionItemDirective header='How do I cancel my event?' content={this.content5}/>
          </AccordionItemsDirective> 
      </AccordionComponent>);
  }
}

export default HelpPage