package ApiBackend;

import java.io.IOException;
import java.math.BigInteger;
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
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Transaction;

public class TestTransaction extends HttpServlet {
	
	private SecureRandom random = new SecureRandom();
	private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		
		Entity root = new Entity("Root", "root");
		datastore.put(root);
	
		long dureeSansTransaction = sansTransaction(root.getKey());
		long dureeAvecTransaction = avecTransaction(root.getKey());
		long dureeAvecTransactionFolle = avecTransactionFolle(root.getKey());
		
		resp.setContentType("text/plain");
		resp.getWriter().println("Sans transaction : "+dureeSansTransaction);
		resp.getWriter().println("Avec transaction : "+dureeAvecTransaction);
		resp.getWriter().println("Avec transaction : "+dureeAvecTransactionFolle);
	}
	
	private long avecTransactionFolle(Key parentKey) {
		
		long deb = System.currentTimeMillis();
		
		Transaction txn = datastore.beginTransaction();
		
		List<String> allFriends = new ArrayList();
		
		
		
		
		for (int i=0; i<1000; i++) {
			String name = new BigInteger(50, random).toString(32);
			
			allFriends.add("body-"+name);
			Entity employee = new Entity("Body", "body-"+name, parentKey);
			employee.setProperty("name", name);
			
			if (i > 100) {
				Random randomizer = new Random();
				List<String> friends = new ArrayList();
				
				for (int j=0;j<5;j++) {
					friends.add(allFriends.get(randomizer.nextInt(allFriends.size())));
				}
				
				employee.setProperty("friends", friends);
			}

			txn = datastore.beginTransaction();
			
			try {
				datastore.put(employee);
			} finally {
				txn.commit();
			}
		}
		
		long fin = System.currentTimeMillis();
		
		return fin-deb;
	}
	
	private long avecTransaction(Key parentKey) {
		
		long deb = System.currentTimeMillis();

		Transaction txn = datastore.beginTransaction();
		
		try {
			insert(parentKey);
			txn.commit();
		} finally {
			/*if (txn.isActive()) {
				txn.rollback();
			}*/
		}

		long fin = System.currentTimeMillis();
		
		return fin-deb;
	}
	
	private long sansTransaction(Key parentKey) {
		
		long deb = System.currentTimeMillis();
		
		insert(parentKey);
		
		long fin = System.currentTimeMillis();
		
		return fin-deb;
		
	}
	
	private void insert(Key parentKey) {
		
		List<String> allFriends = new ArrayList();
				
		
		for (int i=0; i<1000; i++) {
			String name = new BigInteger(50, random).toString(32);
			
			allFriends.add("body-"+name);
			Entity employee = new Entity("Body", "body-"+name, parentKey);
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
	}
}
