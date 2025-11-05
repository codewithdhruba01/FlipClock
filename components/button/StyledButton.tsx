'use client';

import styled from 'styled-components';

interface StyledButtonProps {
  $outline?: string;
  $color?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButtonBase = styled.button<{ $outline?: string; $color?: string }>`
  --button_radius: 0.75em;
  --button_color: ${(p) => p.$color || '#e8e8e8'};
  --button_outline_color: ${(p) => p.$outline || '#000'};

  font-size: 17px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: var(--button_radius);
  background: var(--button_outline_color);
  transition: transform 0.2s ease;

  .button_top {
    display: block;
    box-sizing: border-box;
    border: 2px solid var(--button_outline_color);
    border-radius: var(--button_radius);
    padding: 0.75em 2em;
    background: var(--button_color);
    color: var(--button_outline_color);
    transform: translateY(-0.25em);
    transition: transform 0.1s ease, box-shadow 0.2s ease;
  }

  &:hover .button_top {
    transform: translateY(-0.4em);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  &:active .button_top {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

export default function StyledButton({
  $outline,
  $color,
  children,
  onClick,
}: StyledButtonProps) {
  return (
    <StyledButtonBase $outline={$outline} $color={$color} onClick={onClick}>
      <span className="button_top">{children}</span>
    </StyledButtonBase>
  );
}
