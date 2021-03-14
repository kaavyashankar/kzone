<?php
/**
 * Basic search & filter on post lists.
 * Shows how to implement a search by string
 * See functions.js in your theme for the client side
 */
 
/**
 * Add search params sent by the app to the default component's query.
 */
add_filter( 'wpak_posts_list_query_args', 'search_component_query', 10, 2 );
function search_component_query( $query_args, $component ) {
	$my_search_filters = WpakWebServiceContext::getClientAppParam( 'my_search_filters' );
	if ( !empty( $my_search_filters ) ) {
		if ( !empty( $my_search_filters[ 'search_string' ] ) ) {
			$query_args[ 's' ] = $my_search_filters[ 'search_string' ];
		}
		//Note : default WP ordering for searchs is : 
		// ORDER BY wp_posts.post_title LIKE '%search_string%' DESC, wp_posts.post_date DESC 
		//which is not compatible with the default "Get more posts" feature that requires ordering by date.
		//Note: As of WP-AppKit 0.6, if you want to keep WP Search ordering, you can use the 
		//'use-standard-pagination' filter on app side (which will switch back to standard WP pagination),
		//and comment the following line.
		$query_args[ 'orderby' ] = 'date';
		
	}
	return $query_args;
}