import 'test/matchMedia.mock';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RecoilRoot } from 'recoil';
import { useRecoilState } from 'recoil';
import * as Tabs from '@radix-ui/react-tabs';
import React, { useState, useContext, useCallback, useRef } from 'react';
import { useClearConversationsMutation } from 'librechat-data-provider/react-query';
import {
  ThemeContext,
  useLocalize,
  useOnClickOutside,
  useConversation,
  useConversations,
  useLocalStorage,
} from '~/hooks';
import type { TDangerButtonProps } from '~/common';
import { Dropdown } from '~/components/ui';
import store from '~/store';

export const ThemeSelector = ({
  theme,
  onChange,
}: {
  theme: string;
  onChange: (value: string) => void;
}) => {
  const localize = useLocalize();

  const themeOptions = [
    { value: 'system', display: localize('com_nav_theme_system') },
    { value: 'dark', display: localize('com_nav_theme_dark') },
    { value: 'light', display: localize('com_nav_theme_light') },
  ];

  return (
    <div className="flex items-center justify-between">
      <div> {localize('com_nav_theme')} </div>
      <Dropdown
        value={theme}
        onChange={onChange}
        options={themeOptions}
        width={150}
        testId="theme-selector"
      />
    </div>
  );
};
function General() {
  const { theme, setTheme } = useContext(ThemeContext);
  const changeTheme = useCallback(
    (value: string) => {
      setTheme(value);
    },
    [setTheme],
  );
  return (
    <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300">
      <div className="border-b pb-3 last-of-type:border-b-0 dark:border-gray-700">
        <ThemeSelector theme={theme} onChange={changeTheme} />
      </div>
    </div>
  );
}

export default React.memo(General);
