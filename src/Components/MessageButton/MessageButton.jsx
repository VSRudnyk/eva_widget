import { ButtonContainer, QuickMessageBtn } from './MessageButton.styled';

export const MessageButton = ({ onClickBtn }) => {
  const buttonText = [
    'Що ти вмієш?',
    'Як працює Єва?',
    'Що ви продаєте?',
    'Яка ціна iPhone?',
  ];

  return (
    <ButtonContainer>
      {buttonText.map((item) => (
        <QuickMessageBtn onClick={() => onClickBtn(item)} key={item}>
          {item}
        </QuickMessageBtn>
      ))}
    </ButtonContainer>
  );
};
