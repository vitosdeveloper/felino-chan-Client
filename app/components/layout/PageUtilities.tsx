'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import classes from './PageUtilities.module.css';
import { searchPosts } from '@/app/server-actions/handleSearch';
import { IBoards } from '@/utils/boards';
import { Post } from '@/types/generalTypes';
import Link from 'next/link';

const PageUtilities = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  const searchTimeout = useRef<NodeJS.Timeout>();

  const currentBoard = pathname?.split('/')[1] as IBoards;

  // Reset search when changing pages
  useEffect(() => {
    setSearchQuery('');
    setSearchOpen(false);
    setSearchResults([]);
  }, [pathname]);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    
    if (q.trim().length > 1) {
      setIsSearching(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const results = await searchPosts(currentBoard, q);
          setSearchResults(results);
        } catch (error) {
          console.error(error);
        } finally {
          setIsSearching(false);
        }
      }, 600); // 600ms debounce
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Only show on boards, not on root
  if (!pathname || pathname === '/') return null;

  return (
    <div className={classes.fabContainer}>
      <div className={`${classes.searchWrapper} ${searchOpen ? classes.open : ''}`}>
        <input 
          type="text" 
          placeholder="Busca global no Board..." 
          value={searchQuery}
          onChange={handleSearchChange}
          className={classes.searchInput}
        />
        
        {/* Search Results Dropdown */}
        {(isSearching || searchResults.length > 0 || (searchQuery.length > 1 && searchResults.length === 0 && !isSearching)) && (
          <div className={classes.searchResultsModal}>
            {isSearching ? (
              <div className={classes.searchFeedback}>Buscando nos arquivos do chan...</div>
            ) : searchResults.length > 0 ? (
              <div className={classes.resultsList}>
                {searchResults.map((post) => (
                  <div key={post._id} className={classes.resultItem}>
                    <Link href={`/${currentBoard}/res/${post.randomIdGeneratedByMe}`}>
                      <strong>{post.assunto || `Tópico #${post.randomIdGeneratedByMe}`}</strong>
                      <span className={classes.resultPreview} dangerouslySetInnerHTML={{ __html: post.postContent.substring(0, 100) + '...' }} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className={classes.searchFeedback}>Nenhum tópico encontrado.</div>
            )}
          </div>
        )}
      </div>

      <button 
        className={classes.fabBtn} 
        onClick={() => setSearchOpen(!searchOpen)}
        title="Buscar Threads"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      <button 
        className={classes.fabBtn} 
        onClick={() => {
          window.dispatchEvent(new CustomEvent('felino-toggle-form'));
        }}
        title="Abrir Formulário Flutuante"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </button>

      <button className={classes.fabBtn} onClick={scrollToTop} title="Ir para o topo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      <button className={classes.fabBtn} onClick={scrollToBottom} title="Ir para o final">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default PageUtilities;
