package websocketdemo;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.websocket.model.Greeting;
import com.websocket.model.HelloMessage;

@Controller
@EnableAutoConfiguration
public class WebSocketWebController {
    
    @RequestMapping("/")
    public String home() {
        return "home";
    }
    
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        return new Greeting("Hello, " + message.getName() + "!");
    }
}
