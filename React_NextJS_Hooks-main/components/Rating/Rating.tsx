import React, { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";
import { RatingProps } from "./Rating.props";
import cn from "classnames";
import StarIcon from "./star.svg";
import styles from "./Rating.module.css";

export const Rating = forwardRef(({ error, isEditable = false, rating, setRating, className, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number): void => {
    const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, className, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => handlerClick(i + 1)}
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGSVGElement>) => isEditable && handleSpace(i + 1, e)}
          />
        </span>
      );
    });
    setRatingArray(updateArray);
  };

  const changeDisplay = (i: number) => {
    if(!isEditable) {
      return;
    }
    constructRating(i);
  };

  const handlerClick = (i: number) => {
    if(!isEditable || !setRating) {
      return;
    }
    setRating(i);
  };

  const handleSpace = (i: number, e: React.KeyboardEvent<SVGSVGElement>) => {
    if(e.code !== 'Space' || !setRating) {
      return;
    }
    setRating(i);
  };
 
  return (
    <div
      {...props}
      ref={ref}
      className={cn(styles.ratingWrapper, className, {
        [styles.error]: error
      })}
    >
      {ratingArray.map((r, i) => <span key={i}>{r}</span>)}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});
