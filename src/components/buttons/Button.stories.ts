import type { Meta, StoryObj } from '@storybook/react';


import Button from './Button';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;


function prevPage() {
  console.log("test");
}

export const FirstStory: Story = {
  args: {
    clickHandler: prevPage,
    text: "Hello",
  },
};

export const NextButton: Story = {
  args: {
    text:"Goodbye"
  },
}
