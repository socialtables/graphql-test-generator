import gql from "graphql-tag";

export default gql`
	query getUserIdAndName {
		user {
			id,
			name,
			email
		}
	}
`;

export const idForUser = gql`
	query getUserId {
		user {
			id,
			email
		}
	}
`;
