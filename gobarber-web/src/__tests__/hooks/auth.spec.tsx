import React from 'react';

import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';

describe('Auth hook', () => {
  it('should be able to sig in', () => {
    const { result } = renderHook(() => useAuth(), {
      // componente que quero por em volta do useAuth
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result.current.user.email).toEqual('johndoe@example.com');
  });
});
