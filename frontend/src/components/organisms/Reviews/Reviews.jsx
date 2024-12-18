import React, {useState, useEffect} from "react";
import style from './style.module.scss';
import Container from "@/components/atoms/Container/Container.jsx";
import {useFetchReviews, fetchUserByReview} from "@/hooks/handleReview.js";
import Typography from "@/shared/ui/Typography/Tupography.jsx";
import Button from "@/components/atoms/Button/Button.jsx";
import Star from '../../../../public/images/icons/star.svg?react';
import Quote from '../../../../public/images/icons/quote.svg?react';
import Right from '../../../../public/images/icons/right.svg?react';
import Left from '../../../../public/images/icons/left.svg?react';
import SectionTitle from "@/components/molecules/SectionTitle/SectionTitle.jsx";

const Reviews = () => {
    const [page, setPage] = useState(1);
    const limit = 3;
    const {reviews, total} = useFetchReviews(page, limit);
    const totalPages = Math.ceil(total / limit);
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchUsersForReviews = async () => {
            const usersToFetch = reviews.filter((review) => !users[review.id]);
            const userPromises = usersToFetch.map((review) => fetchUserByReview(review.id));
            const fetchedUsers = await Promise.all(userPromises);

            const newUsers = {};
            usersToFetch.forEach((review, index) => {
                newUsers[review.id] = fetchedUsers[index];
            });

            setUsers((prevUsers) => ({...prevUsers, ...newUsers}));
        };

        fetchUsersForReviews();
    }, [reviews, users]);

    const handlePageChange = (direction) => {
        setPage((prevPage) => {
            if (direction === "next" && prevPage < totalPages) return prevPage + 1;
            if (direction === "prev" && prevPage > 1) return prevPage - 1;
            return prevPage;
        });
    };

    const renderReview = (review) => (
        <div key={review.id} className={style.slide}>
            {users[review.id] && (
                <div className={style.userInfo}>
                    <Typography variant="text-xs" black bold uppercase>
                        {users[review.id].username}
                    </Typography>
                </div>
            )}

            <div>
                <Typography variant="text-sm" black capitalize>
                    {review.comment}
                </Typography>
            </div>

            <div className={style.slideFooter}>
                <Quote/>

                <div className={style.slideRating}>
                    {Array.from({length: review.rating}, (_, i) => (
                        <Star key={i}/>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <Container light>
            <SectionTitle secondaryTitle='reviews' mainTitle='our clients love us' className={style.title}/>

            <div className={style.list}>
                {reviews.map(renderReview)}
            </div>

            <div className={style.pagination}>
                <Button
                    onClick={() => handlePageChange("prev")}
                    disabled={page === 1}
                    variant='transparent'
                >
                    <Left/>
                </Button>

                <Button
                    onClick={() => handlePageChange("next")}
                    disabled={page === totalPages}
                    variant='transparent'
                >
                    <Right/>
                </Button>
            </div>
        </Container>
    );
};

export default Reviews;