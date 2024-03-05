import type { Meta, StoryObj } from '@storybook/react';


import InputComponent from '../../pages/create/components/InputComponent';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof InputComponent> = {
  component: InputComponent,
};

export default meta;
type Story = StoryObj<typeof InputComponent>;



export const SearchInput: Story = {
  args: {
    option:"search",
    placeholder:"Test",
    bgColor:"bg-gray_150"
  },
}

export const EmailInput: Story = {
  args: {
    option:"email",
    placeholder:"이메일을 입력해주세요"
  }
}

export const PasswordInput: Story = {
  args: {
    option:"password",
    placeholder:"이메일을 입력해주세요"
  }
}