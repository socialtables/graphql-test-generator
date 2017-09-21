import gql from "graphql-tag";

export default gql`
	query getUserIdAndName {
		user {
			id,
			name
		}
	}
`;

export const idForUser = gql`
	query getUserId {
		user {
			id
		}
	}
`;
