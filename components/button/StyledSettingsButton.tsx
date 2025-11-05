'use client';

import styled from 'styled-components';
import React from 'react';

interface StyledSettingsButtonProps {
  onClick?: () => void;
  theme?: 'light' | 'dark';
}

export default function StyledSettingsButton({ onClick, theme }: StyledSettingsButtonProps) {
  return (
    <StyledButton onClick={onClick} aria-label="Settings" theme={theme}>
      <svg
        className="settings-icon"
        xmlns="http://www.w3.org/2000/svg"
        height={26}
        viewBox="0 -960 960 960"
        width={26}
        fill="#e8eaed"
      >
        <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z" />
      </svg>
      <span className="tooltip">Settings</span>
    </StyledButton>
  );
}

const StyledButton = styled.button<{ theme?: 'light' | 'dark' }>`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 40;
  background-color: #1e1e1e;
  border: 1px solid #ffffff;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) =>
      theme === 'light' ? '#000000' : 'rgba(255, 255, 255, 0.08)'};
    transform: scale(1.05);
  }

  .settings-icon {
    transition: transform 0.4s ease-in;
  }

  .settings-icon:hover {
    transform: rotate(60deg);
  }

  .settings-icon:active {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(-100deg);
    }
    to {
      transform: rotate(180deg);
    }
  }

  .tooltip {
    visibility: hidden;
    width: 90px;
    background-color: #000;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 10;
    bottom: 130%;
    left: 50%;
    margin-left: -45px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
  }

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;
