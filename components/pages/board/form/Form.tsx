'use client';
import React, { useRef } from 'react';
import FormTextarea from './FormTextarea';
import Input from './Input';
import classes from './Form.module.css';
import Button from './Button';
import Reminder from './Reminder';
type Props = { op: boolean };

const Form = ({ op }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const assuntoRef = useRef<HTMLInputElement>(null);
  const comentarioRef = useRef<HTMLTextAreaElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const loading = false;

  return (
    <>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (
            checkboxRef.current &&
            checkboxRef.current instanceof HTMLInputElement
          ) {
            console.log(checkboxRef.current.checked);
          }
        }}
      >
        <div className={classes.inputs}>
          <Input
            placeholder='E-mail / sage (Opcional)'
            type='text'
            refProp={emailRef}
            disabled={loading}
          />
          <Input
            placeholder='Assunto (Opcional)'
            type='text'
            refProp={assuntoRef}
            disabled={loading}
          />
          <FormTextarea
            placeholder='Post (Obrigatório)'
            refProp={comentarioRef}
            disabled={loading}
          />
          <Input
            placeholder='Senha (Obrigatório)'
            type='password'
            refProp={assuntoRef}
            disabled={loading}
          />
          <div className={classes.checkboxContainer}>
            <Input
              id='catImage'
              placeholder='Random Cat Images'
              type='checkbox'
              refProp={checkboxRef}
              disabled={loading || op}
              checked={op ? true : undefined}
            />
            <label htmlFor='catImage'>Random Cat Images</label>
          </div>
        </div>
        <Button>{op ? 'Novo tópico' : 'Responder'}</Button>
      </form>
      <Reminder />
    </>
  );
};

export default Form;
