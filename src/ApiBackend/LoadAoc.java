package ApiBackend;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.Key;

import java.util.ArrayList;
import java.util.List;

@Api(
        name="aoc"
    )
public class LoadAoc {

    @ApiMethod(
            name = "getAoc",
            httpMethod = ApiMethod.HttpMethod.GET,
            path = "aoc"
        )
    public Aoc getAOC() {
        ArrayList<String> departements = new ArrayList<>();
        ArrayList<String> communes = new ArrayList<>();

        departements.add("Calvados");
        departements.add("Orne");

        communes.add("Mortagne au perche");
        communes.add("Lisieux");

        Aoc aoc = new Aoc("Camembert", departements, communes);
        return aoc;
    }

    @ApiMethod(
            name = "loadAocFile",
            httpMethod = ApiMethod.HttpMethod.POST,
            path = "aoc/load-file"
        )
    public Aoc addAOC(Aoc aoc) {
        return aoc;
    }

    public class Aoc {
        protected Key key;
        public String libelle;
        public List<String> departements;
        public List<String> communes;

        public Aoc(String libelle, List<String> departements, List<String> communes) {
            this.libelle = libelle;
            this.departements = departements;
            this.communes = communes;
        }
    }
}
