import { useEffect, useState } from 'react';
import { QueryKey, useQuery } from '@tanstack/react-query';

import { QueryKeys } from '@constants';
import { fetchCurrentUser, fetchUserOverview } from '@network/apiEndpointCalls';
import { formatUserDetails } from '@network/dataFormatters';
import { useAppDispatch } from '@store';
import { setUser } from '@store/reducers/user';

const { currentUser: currentUserKey, userDetails: userDetailsKey } = QueryKeys;

const useUserQuery = () => {
  const dispatch = useAppDispatch();

  const [id, setId] = useState<number | null>(null);

  const { data: userResponse } = useQuery({
    queryKey: [currentUserKey],
    queryFn: () => fetchCurrentUser(),
    staleTime: Infinity,
  });

  const { data: userDetailsResponse } = useQuery<
    UserDetailsResponse,
    Error,
    UserDetailsResponse,
    QueryKey
  >({
    queryKey: [userDetailsKey, id],
    queryFn: () => fetchUserOverview(id!),
    staleTime: Infinity,
    enabled: !!id,
  });

  useEffect(() => {
    if (userResponse) {
      setId(userResponse.id);
    }
  }, [userResponse]);

  useEffect(() => {
    if (userDetailsResponse) {
      dispatch(setUser(formatUserDetails(userDetailsResponse)));
    }
  }, [dispatch, userDetailsResponse]);
};

export default useUserQuery;
