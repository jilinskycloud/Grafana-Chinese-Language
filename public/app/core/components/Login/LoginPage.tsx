// Libraries
import React, { FC } from 'react';
import { css } from 'emotion';

// Components
import { UserSignup } from './UserSignup';
import { LoginServiceButtons } from './LoginServiceButtons';
import LoginCtrl from './LoginCtrl';
import { LoginForm } from './LoginForm';
import { ChangePassword } from '../ForgottenPassword/ChangePassword';
import { Branding } from 'app/core/components/Branding/Branding';
import { HorizontalGroup, LinkButton } from '@grafana/ui';
import { LoginLayout, InnerBox } from './LoginLayout';

const forgottenPasswordStyles = css`
  padding: 0;
  margin-top: 4px;
`;

export const LoginPage: FC = () => {
  document.title = Branding.AppTitle;
  return (
    <LoginLayout>
      <LoginCtrl>
        {({
          loginHint,
          passwordHint,
          ldapEnabled,
          authProxyEnabled,
          disableLoginForm,
          disableUserSignUp,
          login,
          isLoggingIn,
          changePassword,
          skipPasswordChange,
          isChangingPassword,
        }) => (
          <>
            {!isChangingPassword && (
              <InnerBox>
                {!disableLoginForm && (
                  <>
                    <LoginForm
                      onSubmit={login}
                      loginHint={loginHint}
                      passwordHint={passwordHint}
                      isLoggingIn={isLoggingIn}
                    >
                      {!(ldapEnabled || authProxyEnabled) ? (
                        <HorizontalGroup justify="flex-end">
                          <LinkButton
                            className={forgottenPasswordStyles}
                            variant="link"
                            href="/user/password/send-reset-email"
                          >
                            忘记密码了吗?
                          </LinkButton>
                        </HorizontalGroup>
                      ) : (
                        <></>
                      )}
                    </LoginForm>
                  </>
                )}
                <LoginServiceButtons />
                {!disableUserSignUp && <UserSignup />}
              </InnerBox>
            )}
            {isChangingPassword && (
              <InnerBox>
                <ChangePassword onSubmit={changePassword} onSkip={() => skipPasswordChange()} />
              </InnerBox>
            )}
          </>
        )}
      </LoginCtrl>
    </LoginLayout>
  );
};
