package projekat.payload.response;

import lombok.Getter;
import lombok.Setter;

public class JwtResponse {

    private String token;
    private String username;

    public JwtResponse(String jwt, String username) {
        super();
        this.token = jwt;
        this.username = username;
    }

    public String getJwt() {
        return token;
    }

    public void setJwt(String jwt) {
        this.token = jwt;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
