const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql'); 

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		fields: {
			user: {
				type: new GraphQLObjectType({
					name: 'user',
					fields: {
						id: {
							type: GraphQLString
						},
						name: {
							type: GraphQLString
						}
					}
				}),
				resolve: () => ({})
			}
		}
	})
});