package ApiBackend;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

import java.math.BigInteger;

public class TestEntity extends HttpServlet {
	
	private SecureRandom random = new SecureRandom();
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
	
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		
		List<String> allFriends = new ArrayList();
		
		for (int i=0; i<1000; i++) {
			String name = new BigInteger(50, random).toString(32);
			
			allFriends.add("emp-"+name);
			Entity employee = new Entity("Employee", "emp-"+name);
			employee.setProperty("name", name);
			
			if (i > 100) {
				Random randomizer = new Random();
				List<String> friends = new ArrayList();
				
				for (int j=0;j<5;j++) {
					friends.add(allFriends.get(randomizer.nextInt(allFriends.size())));
				}
				
				employee.setProperty("friends", friends);
			}
			
			datastore.put(employee);
		}
		
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, world");
	}
}
