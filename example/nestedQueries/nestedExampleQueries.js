import gql from "graphql-tag";

export default gql`
	query getUserInformation {
		user {
			id,
			name
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
