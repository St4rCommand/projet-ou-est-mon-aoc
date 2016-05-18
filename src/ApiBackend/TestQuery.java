package ApiBackend;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;

public class TestQuery extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, world");
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		
		Filter filter = new  FilterPredicate("friends", FilterOperator.EQUAL, "emp-v527nu41b");
		Filter filter2 = new  FilterPredicate("friends", FilterOperator.EQUAL, "emp-atvg7rosq8");
		Query query = new Query("Employee").setFilter(CompositeFilterOperator.and(filter, filter2));
		
		List employees = datastore.prepare(query).asList(FetchOptions.Builder.withDefaults());
	
		for (int i=0; i<employees.size(); i++) {
			resp.getWriter().println(employees.get(i));
		}
	}
}
