// CustomButton.stories.tsx
import type {Meta, StoryObj} from '@storybook/react';
import {Hello} from './hello';

const meta: Meta<typeof Hello> = {
  title: 'Hello',
  component: Hello,
  argTypes: {},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Hello>;

export const Active: Story = {
  args: {},
};
