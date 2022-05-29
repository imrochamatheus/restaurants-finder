import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import {
  Dialog,
  Typography,
  Grid,
  Rating,
  Divider,
  Avatar,
} from "@mui/material";
import { useEffect } from "react";

const Modal = ({ place, isOpen, setIsOpen }) => {
  useEffect(() => {
    if (place) {
      const isOpenAtTime = place.opening_hours.isOpen(new Date());
      if (isOpenAtTime) {
        console.log("Sim");
      }
    }
  }, [place]);
  return (
    place && (
      <Dialog
        fullWidth
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            maxWidth: "600px",
            gap: 5,
            flexDirection: "column",
            padding: "30px",
          }}
        >
          <Typography variant="h5">{place.name}</Typography>
          {place.formatted_address && (
            <Typography variant="body2" maxWidth={300}>
              <span style={{ fontWeight: 700 }}>Endereço:</span>{" "}
              {place.formatted_address}
            </Typography>
          )}

          {place.opening_hours && (
            <Typography>
              <span style={{ fontWeight: 700 }}>Horas: </span>{" "}
              {place.opening_hours.open_now ? " Aberto" : " Fechado"}
            </Typography>
          )}
          <Typography
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ fontWeight: 700 }}>Média </span> :
            {" " + (place.rating || 0)} -
            <Rating
              name="read-only"
              value={place.rating ?? 0}
              readOnly
              size="small"
            />
          </Typography>
          {place.formatted_phone_number && (
            <Typography variant="body2" maxWidth={300}>
              <span style={{ fontWeight: 700 }}>Telefone:</span>{" "}
              {place.formatted_phone_number}
            </Typography>
          )}

          <Divider />

          {place.reviews && (
            <>
              <Typography variant="h6">Opiniões</Typography>
              {place.reviews.map((review) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      padding: 1,
                      gap: "10px",
                    }}
                  >
                    <Avatar
                      src={review.author_name}
                      alt={review.author_name}
                      sx={{ width: 40, height: 40, marginTop: 1 }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography variant="body1" fontWeight={700}>
                        {review.author_name}
                      </Typography>
                      <Typography variant="body2">{review.text}</Typography>
                    </div>
                  </div>
                );
              })}{" "}
            </>
          )}

          {place.photos.length && (
            <>
              <Divider sx={{ py: 1 }} />
              <Typography variant="h6">Galeria</Typography>
              <Grid container gap={0.5} justifyContent="start">
                {place.photos &&
                  place.photos.map((photo, i) => (
                    <Grid item xs={3.5} sm={2} component={Zoom} key={i}>
                      <img
                        width="100%"
                        height={90}
                        src={`${photo.getUrl()}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${photo.getUrl()}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={place.name}
                        loading="lazy"
                      />
                    </Grid>
                  ))}
              </Grid>
            </>
          )}
        </div>
      </Dialog>
    )
  );
};

export default Modal;
