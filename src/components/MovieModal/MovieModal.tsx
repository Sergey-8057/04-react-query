import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({
  movie: { backdrop_path, poster_path, title, overview, release_date, vote_average },
  onClose,
}: MovieModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const validPath = () => {
    if (backdrop_path === null) {
      return `https://image.tmdb.org/t/p/w500${poster_path}`;
    }
    return `https://image.tmdb.org/t/p/original/${backdrop_path}`;
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <img src={validPath()} alt={title} className={css.image} />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.getElementById('movie-modal-root') as HTMLDivElement
  );
}
