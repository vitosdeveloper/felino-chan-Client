import React from 'react';
import { useFormStatus } from 'react-dom';

type Props = { 
  op: boolean;
  checked?: boolean;
  onChange?: () => void;
};

const CatInput = ({ op, checked, onChange }: Props) => {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        aria-checked={op}
        id='allowCatImage'
        name='allowCatImage'
        type='checkbox'
        disabled={op || pending}
        checked={op ? true : checked}
        onChange={op ? undefined : onChange}
      />
      <label htmlFor='allowCatImage'>Random Cat Images</label>
    </>
  );
};

export default CatInput;
