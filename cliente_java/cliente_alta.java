import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

//
// Clase para dar de alta una nueva persona en la tabla Persona de la Base de Datos
//

public class cliente_alta {
   public static void main(String[] args) throws ClientProtocolException, IOException {
    final String POST_PARAMS = "{\n" + "\"dni\": \"99999999X\",\r\n" +
        "    \"nombre\": \"Luis\",\r\n" +
        "    \"apellidos\": \"Mayorgas\"" + "\n}";

    System.out.println(POST_PARAMS);
    URL obj = new URL("http://localhost:8080/alta");
    HttpURLConnection postConnection = (HttpURLConnection) obj.openConnection();

    postConnection.setRequestMethod("POST");
    postConnection.setRequestProperty("Content-Type", "application/json");
    postConnection.setDoOutput(true);

    OutputStream os = postConnection.getOutputStream();
    os.write(POST_PARAMS.getBytes());
    os.flush();
    os.close();

    int responseCode = postConnection.getResponseCode();
    System.out.println("POST Response Code :  " + responseCode);
    System.out.println("POST Response Message : " + postConnection.getResponseMessage());

     if (responseCode == HttpURLConnection.HTTP_CREATED) {
        BufferedReader in = new BufferedReader(new InputStreamReader(
            postConnection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in .readLine()) != null) {
            response.append(inputLine);
        } in .close();
        System.out.println(response.toString());
      } else {
          System.out.println("ERROR AL EJECUTAR LA OPERACION POST");
      }
  }
}
