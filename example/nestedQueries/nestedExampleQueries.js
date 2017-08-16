import gql from "graphql-tag";

export default gql`
	query roomTemplatesForUser {
		user {
			space_templates {
				id,
				name,
				image,
				created_at
			}
		}
	}
`;

export const idForUser = gql`
	query nameForUser {
		user {
			id
		}
	}
`;
