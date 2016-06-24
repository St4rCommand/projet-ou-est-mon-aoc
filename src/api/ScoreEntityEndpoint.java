package api;

import api.PMF;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

@Api(name = "scoreentityendpoint", namespace = @ApiNamespace(ownerDomain = "mycompany.com", ownerName = "mycompany.com", packagePath = "services"))
public class ScoreEntityEndpoint {

	/**
	 * This method lists all the entities inserted in datastore.
	 * It uses HTTP GET method and paging support.
	 *
	 * @return A CollectionResponse class containing the list of all entities
	 * persisted and a cursor to the next page.
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listScoreEntity")
	public CollectionResponse<ScoreEntity> listScoreEntity(
			@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {

		PersistenceManager mgr = null;
		Cursor cursor = null;
		List<ScoreEntity> execute = null;

		try {
			mgr = getPersistenceManager();
			Query query = mgr.newQuery(ScoreEntity.class);
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				HashMap<String, Object> extensionMap = new HashMap<String, Object>();
				query.setExtensions(extensionMap);
			}

			if (limit != null) {
				query.setRange(0, limit);
			}

			execute = (List<ScoreEntity>) query.execute();
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and accomodate
			// for lazy fetch.
			for (ScoreEntity obj : execute)
				;
		} finally {
			mgr.close();
		}

		return CollectionResponse.<ScoreEntity> builder().setItems(execute)
				.setNextPageToken(cursorString).build();
	}

	/**
	 * This method gets the entity having primary key id. It uses HTTP GET method.
	 *
	 * @param id the primary key of the java bean.
	 * @return The entity with primary key id.
	 */
	@ApiMethod(name = "getScoreEntity")
	public ScoreEntity getScoreEntity(@Named("id") Long id) {
		PersistenceManager mgr = getPersistenceManager();
		ScoreEntity scoreentity = null;
		try {
			scoreentity = mgr.getObjectById(ScoreEntity.class, id);
		} finally {
			mgr.close();
		}
		return scoreentity;
	}

	/**
	 * This inserts a new entity into App Engine datastore. If the entity already
	 * exists in the datastore, an exception is thrown.
	 * It uses HTTP POST method.
	 *
	 * @param scoreentity the entity to be inserted.
	 * @return The inserted entity.
	 */
	@ApiMethod(name = "insertScoreEntity")
	public ScoreEntity insertScoreEntity(ScoreEntity scoreentity) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			if (containsScoreEntity(scoreentity)) {
				throw new EntityExistsException("Object already exists");
			}
			mgr.makePersistent(scoreentity);
		} finally {
			mgr.close();
		}
		return scoreentity;
	}

	/**
	 * This method is used for updating an existing entity. If the entity does not
	 * exist in the datastore, an exception is thrown.
	 * It uses HTTP PUT method.
	 *
	 * @param scoreentity the entity to be updated.
	 * @return The updated entity.
	 */
	@ApiMethod(name = "updateScoreEntity")
	public ScoreEntity updateScoreEntity(ScoreEntity scoreentity) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			if (!containsScoreEntity(scoreentity)) {
				throw new EntityNotFoundException("Object does not exist");
			}
			mgr.makePersistent(scoreentity);
		} finally {
			mgr.close();
		}
		return scoreentity;
	}

	/**
	 * This method removes the entity with primary key id.
	 * It uses HTTP DELETE method.
	 *
	 * @param id the primary key of the entity to be deleted.
	 */
	@ApiMethod(name = "removeScoreEntity")
	public void removeScoreEntity(@Named("id") Long id) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			ScoreEntity scoreentity = mgr.getObjectById(ScoreEntity.class, id);
			mgr.deletePersistent(scoreentity);
		} finally {
			mgr.close();
		}
	}

	private boolean containsScoreEntity(ScoreEntity scoreentity) {
		PersistenceManager mgr = getPersistenceManager();
		boolean contains = true;
		try {
			mgr.getObjectById(ScoreEntity.class, scoreentity.getId());
		} catch (javax.jdo.JDOObjectNotFoundException ex) {
			contains = false;
		} finally {
			mgr.close();
		}
		return contains;
	}

	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}

}