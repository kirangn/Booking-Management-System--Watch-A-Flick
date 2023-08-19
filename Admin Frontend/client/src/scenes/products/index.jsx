import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  CardMedia,
} from "@mui/material";

import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({
  // _id,
  // name,
  // description,
  // price,
  // rating,
  // category,
  // supply,
  // stat,
  _id,
  movie_id,
  movie_name,
  movie_genres,
  movie_rating,
  movie_languages,
  movie_length,
  movie_subtitles,
  movie_cast,
  movie_image,
  movie_release_date,
}) => {
  const theme = useTheme();
  //const idString = movie_id.toString();
  const formattedDate = new Date(movie_release_date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short", 
    year: "numeric",
  });
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      {/* <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent> */}

      <CardMedia component="img" height="194" image={movie_image} alt="hello" />
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          Movie Id: {movie_id}
        </Typography>
        <Typography variant="h5" component="div">
          {movie_name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {movie_length}
        </Typography>
        <Rating value={Number(movie_rating)} readOnly />

        <Typography variant="body2">{movie_cast}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {movie_id}</Typography>
          <Typography>Genre: {movie_genres}</Typography>
          <Typography>Release Date: {formattedDate}</Typography>
          <Typography>Movie Languages: {movie_languages}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MOVIES" subtitle="See your list of movies ." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              movie_id,
              movie_name,
              movie_genres,
              movie_rating,
              movie_languages,
              movie_length,
              movie_subtitles,
              movie_cast,
              movie_image,
              movie_release_date,
            }) => (
              <Product
                key={_id}
                movie_id={movie_id}
                movie_name={movie_name}
                movie_genres={movie_genres}
                movie_rating={movie_rating}
                movie_languages={movie_languages}
                movie_length={movie_length}
                movie_subtitles={movie_subtitles}
                movie_cast={movie_cast}
                movie_image={movie_image}
                movie_release_date={movie_release_date}
              />
            )
          )}
          {/* {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )} */}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;

// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardActions,
//   CardContent,
//   Collapse,
//   Button,
//   Typography,
//   Rating,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import Header from "components/Header";
// import { useGetProductsQuery } from "state/api";

// const Product = ({
//   _id,
//   name,
//   description,
//   price,
//   rating,
//   category,
//   supply,
//   stat,
// }) => {
//   const theme = useTheme();
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <Card
//       sx={{
//         backgroundImage: "none",
//         backgroundColor: theme.palette.background.alt,
//         borderRadius: "0.55rem",
//       }}
//     >
//       <CardContent>
//         <Typography
//           sx={{ fontSize: 14 }}
//           color={theme.palette.secondary[700]}
//           gutterBottom
//         >
//           {category}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {name}
//         </Typography>
//         <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
//           ${Number(price).toFixed(2)}
//         </Typography>
//         <Rating value={rating} readOnly />

//         <Typography variant="body2">{description}</Typography>
//       </CardContent>
//       <CardActions>
//         <Button
//           variant="primary"
//           size="small"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           See More
//         </Button>
//       </CardActions>
//       <Collapse
//         in={isExpanded}
//         timeout="auto"
//         unmountOnExit
//         sx={{
//           color: theme.palette.neutral[300],
//         }}
//       >
//         <CardContent>
//           <Typography>id: {_id}</Typography>
//           <Typography>Supply Left: {supply}</Typography>
//           <Typography>
//             Yearly Sales This Year: {stat.yearlySalesTotal}
//           </Typography>
//           <Typography>
//             Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// };

// const Products = () => {
//   const { data, isLoading } = useGetProductsQuery();
//   const isNonMobile = useMediaQuery("(min-width: 1000px)");

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="PRODUCTS" subtitle="See your list of products." />
//       {data || !isLoading ? (
//         <Box
//           mt="20px"
//           display="grid"
//           gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//           justifyContent="space-between"
//           rowGap="20px"
//           columnGap="1.33%"
//           sx={{
//             "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//           }}
//         >
//           {data.map(
//             ({
//               _id,
//               name,
//               description,
//               price,
//               rating,
//               category,
//               supply,
//               stat,
//             }) => (
//               <Product
//                 key={_id}
//                 _id={_id}
//                 name={name}
//                 description={description}
//                 price={price}
//                 rating={rating}
//                 category={category}
//                 supply={supply}
//                 stat={stat}
//               />
//             )
//           )}
//         </Box>
//       ) : (
//         <>Loading...</>
//       )}
//     </Box>
//   );
// };

// export default Products;
