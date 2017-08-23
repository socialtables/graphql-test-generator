import gql from "graphql-tag";

export default gql`
	query spaceTemplatesForUser {
		user {
			space_templates {
				id,
				name,
				created_at
			}
		}
	}
`;

export const idForUser = gql`
	query idForUser {
		user {
			id
		}
	}
`;
