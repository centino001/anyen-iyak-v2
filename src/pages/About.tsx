import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import VolunteerModal from '../components/VolunteerModal';

const About: React.FC = () => {
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);

  const handleVolunteerClick = () => {
    setVolunteerModalOpen(true);
  };

  const handleCloseVolunteerModal = () => {
    setVolunteerModalOpen(false);
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: 'white', minHeight: "calc(100vh - 70px)" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 600,
            fontSize: { xs: "2rem", md: "2.5rem" },
            color: "#333",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "3px",
            mb: 4
          }}
        >
          ABOUT US
        </Typography>

        {/* Introduction Paragraphs */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              mb: 3,
              textAlign: "justify"
            }}
          >
            <strong>Anyen Iyak Foundation for Art and Culture Is A Non-Profit Organisation Dedicated To Capturing, Preserving, And Sharing The Rich Heritage Of Akwa Ibom's Indigenous People.</strong> All Through Its Projects And Initiatives, The Foundation Seeks To Support, Encourage, And Promote Akwa Ibom's Art And Culture Locally And Globally.
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#333",
              mb: 4,
              textAlign: "justify"
            }}
          >
            "Anyen Iyak," Meaning "Fish Eye" In Ibibio, Symbolizes Unwavering Vision And Awareness. Just As A Fish's Eyes Remain Open In Life And Death, The Foundation Remains Steadfast In Connecting The Past With The Present To Carry It Forward Into The Future. With Unwavering Focus, It Serves As A Guardian Of Heritage, Ensuring That The Culture Of Akwa Ibom Endures And Thrives.
          </Typography>
        </Box>

        {/* Three Pillars Section with Image */}
        <Box sx={{ mb: 6 }}>
          {/* Header at the top */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              fontSize: "1.3rem",
              color: "#D05A34",
              mb: 3,
              textTransform: "uppercase",
              lineHeight: 1.2,
              textAlign: "center"
            }}
          >
            THE THREE PILLARS OF ANYEN IYAK FOUNDATION FOR ART AND CULTURE
          </Typography>

          <Grid container spacing={3}>
            {/* Image on the left */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  width: "100%",
                  height: "320px",
                  backgroundImage: "url(/images/about_template_video.svg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0"
                }}
              />
            </Grid>

            {/* Three Pillars Content on the right */}
            <Grid item xs={12} md={8}>
              <Typography
                sx={{
                  fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  color: "#333",
                  mb: 2,
                  textAlign: "justify"
                }}
              >
                <strong>Cultural Regeneration, Preservation, And Continuity:</strong> Preserving And Passing Down The Unique Traditions, Customs, And Values Of Akwa Ibom's Indigenous Communities Is Vital For Sustaining Its Cultural Identity. This Pillar Is Dedicated To Discovering, Showing, And Maintaining These Cultural Elements Through Targeted Research Initiatives And Comprehensive Documentation Efforts, Ensuring They Remain Relevant And Accessible For Both Present And Future Generations.
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  color: "#333",
                  mb: 2,
                  textAlign: "justify"
                }}
              >
                <strong>Artistic Development:</strong> This Pillar Is Dedicated To Supporting And Empowering Artists Within And Beyond Akwa Ibom State By Fostering A Vibrant Environment For Creativity And Expression. It Focuses On The Holistic Development Of Artists By Equipping Them With The Skills, Knowledge, And Tools To Realize Their Great Work, Providing Platforms To Amplify Their Voice And Showcase Their Work To Local And Global Audiences.
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  color: "#333",
                  mb: 2,
                  textAlign: "justify"
                }}
              >
                <strong>Unification Of The African Art And Culture Ecosystem:</strong> This Pillar Focuses On Building A Connected Network For Individuals Within Africa's Art And Culture Ecosystem, Fostering Collaboration, Knowledge-Sharing, And Mutual Growth. It Aims To Break Down Silos By Encouraging Partnerships And Instilling A Shared Sense Of Responsibility To Uplift And Support One Another.
              </Typography>

              {/* Explore Our Programmes Button */}
              <Box sx={{ mt: 3, display: "flex", alignItems: "stretch", gap: 2 }}>
                <Box
                  component="button"
                  sx={{ 
                    backgroundColor: "white",
                    color: "black",
                    border: "2px solid #D05A34",
                    padding: "12px 24px",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    minHeight: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  EXPLORE OUR PROGRAMMES
                </Box>
                <Box
                  sx={{
                    color: "white",
                    border: "2px solid #D05A34",
                    borderRadius: "4px",
                    display: "flex",
                    minHeight: "48px",
                    width: "48px",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backgroundColor: "white",
                    "&:hover": {
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/images/arrow_forward.svg"
                    alt="Arrow Forward"
                    sx={{
                      width: "28px",
                      height: "28px",
                      filter: "brightness(0)",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Fundamental Values and Contact Section */}
        <Grid container spacing={4}>
          {/* Left Column - Fundamental Values */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: "1.3rem",
                color: "#333",
                mb: 3,
                textTransform: "uppercase"
              }}
            >
              AT THE HEART OF EVERYTHING WE DO ARE OUR FUNDAMENTAL VALUES
            </Typography>

            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#333",
                    mb: 0.5
                  }}
                >
                  Teamwork
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    color: "#666"
                  }}
                >
                  Collaboration Is Key - Every Effort, Big Or Small, Adds To The Bigger Picture.
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#333",
                    mb: 0.5
                  }}
                >
                  Leadership
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    color: "#666"
                  }}
                >
                  Leadership Is Not Just For The Few; It Is For Everyone. We Empower Individuals To Inspire Change And Lead With Intention.
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#333",
                    mb: 0.5
                  }}
                >
                  Integrity
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    color: "#666"
                  }}
                >
                  Our Actions Are Built On Honesty And Transparency, Earning Us Trust Through Consistent Integrity.
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#333",
                    mb: 0.5
                  }}
                >
                  Mutual Respect
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    color: "#666"
                  }}
                >
                  We Honor Every Voice, Creating An Inclusive Environment Where Our Diverse Perspectives Bring Us Closer.
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#333",
                    mb: 0.5
                  }}
                >
                  Resilience
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    color: "#666"
                  }}
                >
                  Challenges Are Opportunities For Growth, So We Face Them Head-On While Staying Focused On Our Mission.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Contact Information */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: "1.1rem",
                color: "#333",
                mb: 2,
                textTransform: "uppercase"
              }}
            >
              CONTACT ANYEN IYAK FOUNDATION
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontSize: "0.85rem",
                lineHeight: 1.5,
                color: "#666",
                mb: 1
              }}
            >
              Unit D, Plot 2B, Ewet Housing Estate<br />
              Uyo 520231, Akwa Ibom<br />
              Nigeria
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontSize: "0.85rem",
                lineHeight: 1.5,
                color: "#666",
                mb: 3
              }}
            >
              09064552825, 09037334976
            </Typography>

            {/* OpenStreetMap */}
            <Box
              sx={{
                width: "100%",
                height: "180px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                mb: 3
              }}
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=7.9324%2C5.0061%2C7.9524%2C5.0261&layer=mapnik&marker=5.016114486667406%2C7.9424274655633225"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Anyen Iyak Foundation Location - Unit D, Plot 2B, Ewet Housing Estate, Uyo"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Section - How Can You Be Part */}
      <Box sx={{ backgroundColor: "black", py: 6, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 600,
              fontSize: "1.5rem",
              color: "white",
              textAlign: "center",
              mb: 3,
              textTransform: "uppercase"
            }}
          >
            HOW CAN YOU BE PART OUR FOUNDATION?
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontSize: "1rem",
              color: "white",
              textAlign: "center",
              mb: 4,
              maxWidth: "600px",
              mx: "auto"
            }}
          >
            Join Anyen Iyak Foundation For Art And Culture And Be Part Of Preserving And Promoting Our Rich Heritage.
          </Typography>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleVolunteerClick}
              sx={{
                backgroundColor: "#D05A34",
                color: "white",
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: "1rem",
                padding: "12px 32px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                "&:hover": {
                  backgroundColor: "#FF6B35",
                }
              }}
            >
              VOLUNTEER
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Volunteer Modal */}
      <VolunteerModal 
        open={volunteerModalOpen} 
        onClose={handleCloseVolunteerModal} 
      />
    </Box>
  );
};

export default About; 