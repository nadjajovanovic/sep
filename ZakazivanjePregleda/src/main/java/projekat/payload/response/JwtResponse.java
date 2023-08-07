package projekat.payload.response;

import lombok.Getter;
import lombok.Setter;

public class JwtResponse {

    private String token;
    private String username;

    public JwtResponse(String jwt) {
        super();
        this.token = jwt;
    }

    public String getJwt() {
        return token;
    }

    public void setJwt(String jwt) {
        this.token = jwt;
    }
}
