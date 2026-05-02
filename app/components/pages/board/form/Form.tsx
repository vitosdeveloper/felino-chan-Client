'use client';
import FormTextarea from './FormTextarea';
import Input from './Input';
import classes from './Form.module.css';
import Button from './Button';
import Reminder from './Reminder';
import Centralizer from '@/app/components/layout/Centralizer';
import usePassword from '@/custom-hooks/usePassword';
import { setOneStorage } from '@/utils/handleLocalStorage';
import { handleAddThread } from '@/app/server-actions/handleAddThread.';
import { handleReply } from '@/app/server-actions/handleReply';
import { useFormState } from 'react-dom';
import CatInput from './CatInput';
import { useEffect, useRef, useState, useCallback } from 'react';
import { IBoards } from '@/utils/boards';
import { useRouter } from 'next/navigation';

type Props = { op: boolean; threadNumber?: number; board: IBoards };

const initialState = {
  error: '',
};

const Form = ({ op, threadNumber, board }: Props) => {
  const router = useRouter();
  
  // Controlled states for syncing both forms
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [postContent, setPostContent] = useState('');
  const [withCat, setWithCat] = useState(false);

  const formAnchorRef = useRef<HTMLDivElement>(null);
  const [isFloating, setIsFloating] = useState(false);
  const [forceShowFloating, setForceShowFloating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { password, setPassword } = usePassword();
  
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setOneStorage('felinoChanPassword', value);
  };

  const handleReplyAction = (state: { error: string }, formData: FormData) => {
    state.error = '';
    return handleReply(state, formData, threadNumber, board);
  };

  const handleThreadAction = (state: { error: string }, formData: FormData) => {
    state.error = '';
    return handleAddThread(state, formData, board);
  };

  const [state, formAction] = useFormState(
    op ? handleThreadAction : handleReplyAction,
    initialState
  );

  // Scroll observer for floating form visibility
  useEffect(() => {
    const anchor = formAnchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFloating(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-100px 0px 0px 0px' }
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  // Listen for quote events
  const handleQuote = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail;
    const quote = `>>${detail} `;
    setPostContent(prev => prev + quote);
    
    // Auto-expand and show floating form if it's active
    if (isFloating || forceShowFloating) setIsCollapsed(false);
  }, [isFloating, forceShowFloating]);

  // Listen for toggle and quote events
  useEffect(() => {
    const handleToggle = () => {
      setForceShowFloating(prev => !prev);
      setIsCollapsed(false);
    };
    window.addEventListener('felino-quote', handleQuote);
    window.addEventListener('felino-toggle-form', handleToggle);
    return () => {
      window.removeEventListener('felino-quote', handleQuote);
      window.removeEventListener('felino-toggle-form', handleToggle);
    };
  }, [handleQuote]);

  const shouldShowFloating = isFloating || forceShowFloating;

  // Handle successful submission (clearing state)
  const onSubmit = async (fd: FormData) => {
    // Add the cat checkbox value manually to formData since it's controlled
    // Actually, formData usually picks it up from the 'name' attribute if it's in the form.
    // But since it's a Server Action, fd will have the checkbox value if it's checked.
    
    await formAction(fd);
    
    // Clear local states
    setEmail('');
    setAssunto('');
    setPostContent('');
    setWithCat(false);
    
    // Refresh to show new content
    router.refresh();
    
    // Scroll to bottom if it's a reply
    if (!op) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 500);
    }
  };

  const renderFormFields = () => (
    <div className={classes.inputs}>
      <Input
        name='email'
        placeholder='E-mail / sage (Opcional)'
        type='text'
        value={email}
        changeHandler={setEmail}
      />
      <Input
        name='assunto'
        placeholder='Assunto (Opcional)'
        type='text'
        value={assunto}
        changeHandler={setAssunto}
      />
      <FormTextarea
        name='postContent'
        placeholder='Post (Obrigatório)'
        required
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <Input
        name='password'
        placeholder='Senha (Obrigatório)'
        type='password'
        required
        value={password}
        changeHandler={handlePasswordChange}
      />
      <div className={classes.checkboxContainer}>
        <CatInput op={op} checked={withCat} onChange={() => setWithCat(!withCat)} />
      </div>
    </div>
  );

  return (
    <>
      {/* Inline Form (Always present) */}
      <div ref={formAnchorRef}>
        <Centralizer>
          <form action={onSubmit} className={classes.form}>
            {renderFormFields()}
            <Button>{op ? 'Novo tópico' : 'Responder'}</Button>
          </form>
          {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
          <Reminder />
        </Centralizer>
      </div>

      {/* Floating Form (Always mounted, toggled by CSS) */}
      <div className={`${classes.floatingForm} ${shouldShowFloating ? classes.visible : classes.hidden} ${isCollapsed ? classes.collapsed : ''}`}>
        <button
          className={classes.floatingToggle}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir' : 'Minimizar'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
            {isCollapsed ? <path d="M12 19V5M5 12l7-7 7 7" /> : <path d="M12 5v14M19 12l-7 7-7-7" />}
          </svg>
          <span>{isCollapsed ? 'Responder' : 'Minimizar'}</span>
        </button>
        
        {!isCollapsed && (
          <form action={onSubmit} className={classes.form}>
            {renderFormFields()}
            <Button>{op ? 'Novo tópico' : 'Responder'}</Button>
            {state?.error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{state.error}</p>}
          </form>
        )}
      </div>
    </>
  );
};

export default Form;
