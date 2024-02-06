import React, { RefObject } from 'react';
import { useFormStatus } from 'react-dom';

type Props = { op: boolean };

const CatInput = ({ op }: Props) => {
  const { pending } = useFormStatus();

  return (
    <>
      <input
        aria-checked={op}
        id='allowCatImage'
        name='allowCatImage'
        type='checkbox'
        disabled={op || pending}
        defaultChecked={true}
      />
      <label htmlFor='allowCatImage'>Random Cat Images</label>
    </>
  );
};

export default CatInput;
