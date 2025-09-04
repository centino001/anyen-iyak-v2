import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Button, Grid, Card, CardContent, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../config/images";
import { ImagePresets } from "../utils/cloudinaryOptimizer";
import { fetchProjects } from "../utils/api";
import { Project } from "../types";
import useScrollAnimation from "../hooks/useScrollAnimation";

// Cache for projects data
let projectsCache: Project[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Optimized scroll animations - reduced from 5 to 2
  const heroRef = useScrollAnimation(0.1);
  const contentRef = useScrollAnimation(0.1);

  // Memoized project data to prevent unnecessary re-renders
  const memoizedProjects = useMemo(() => projects, [projects]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        
        // Check cache first
        const now = Date.now();
        if (projectsCache && (now - cacheTimestamp) < CACHE_DURATION) {
          setProjects(projectsCache);
          setLoading(false);
          return;
        }

        const data = await fetchProjects();
        projectsCache = data;
        cacheTimestamp = now;
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleDonateClick = () => {
    // For now, just scroll to donate section or navigate to donate page
    // window.open("https://your-donation-link.com", "_blank");
  };

  const handleProjectClick = (project: Project) => {
    navigate(`/projects/${project.slug}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Optimized hero image with responsive loading
  const heroImageUrl = useMemo(() => {
    return ImagePresets.hero('https://res.cloudinary.com/dgsctl247/image/upload/v1754786067/aif_hzhjf7.jpg');
  }, []);

      return (
    <Box sx={{ width: "100%", minHeight: "calc(100vh - 70px)" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "calc(100vh - 70px)",
          width: "100%",
          backgroundImage: `url(${heroImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          paddingLeft: { xs: "20px", md: "60px" },
          paddingRight: { xs: "20px", md: "60px" },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
        }}
      >
        <Box
          ref={heroRef.ref}
          className={`animate-fade-in-up ${heroRef.isVisible ? 'animate-fade-in-up' : ''}`}
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: { xs: "100%", md: "800px" },
            color: "white",
          }}
        >
          <Typography
            className="animate-fade-in-up animate-delay-200"
            sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 300,
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "2.75rem",
                lg: "3.25rem",
              },
              lineHeight: { xs: 1.2, md: 1.3 },
              marginBottom: { xs: 2, md: 3 },
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              letterSpacing: "0.5px",
            }}
          >
            Like The Eyes Of A Fish That Never Closes In Life Or Death, We See
            Our Past As We Bring It To The Present In Order To Carry It Forth To
            The Future.
          </Typography>

          <Typography
            className="animate-fade-in-up animate-delay-400"
            sx={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
              fontSize: {
                xs: "1.1rem",
                sm: "1.5rem",
                md: "2rem",
                lg: "2.25rem",
              },
              lineHeight: { xs: 1.3, md: 1.4 },
              marginBottom: { xs: 3, md: 4 },
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              letterSpacing: "0.3px",
            }}
          >
            Our Eyes Will Never Be Shut In Life Or Death.
          </Typography>

          <Box className="animate-fade-in-up animate-delay-600" sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleDonateClick}
              className="hover-lift hover-glow"
              sx={{
                backgroundColor: "#D05A34",
                color: "white",
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: { xs: "0.9rem", md: "1rem" },
                padding: { xs: "14px 28px", md: "16px 32px" },
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                border: "none",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: "#FF6B35",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 25px rgba(255, 107, 53, 0.3)",
                },
              }}
            >
              DONATE TO US
            </Button>
            <Box
              className="hover-lift hover-glow animate-pulse-slow"
              sx={{
                backgroundColor: "#D05A34",
                color: "white",
                padding: { xs: "14px 16px", md: "16px 18px" },
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: "#FF6B35",
                  transform: "translateY(-2px)",
                  boxShadow: "0 10px 25px rgba(255, 107, 53, 0.3)",
                },
              }}
              onClick={handleDonateClick}
            >
              <Box
                component="span"
                sx={{
                  fontSize: "1.2rem",
                  transform: "rotate(-45deg)",
                  display: "inline-block",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                →
              </Box>
        </Box>
          </Box>
        </Box>
      </Box>

      {/* Content Sections - All using single scroll animation */}
      <Box ref={contentRef.ref} className={`scroll-reveal ${contentRef.isVisible ? 'revealed' : ''}`}>
        {/* Featured Projects Section */}
        <Box sx={{ backgroundColor: "#121212", py: 8 }}>
          <Box sx={{ maxWidth: "1600px", mx: "auto", px: { xs: 2, md: 2 }, ml: { xs: 2, md: 20 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "2rem" },
                color: "white",
                textAlign: "center",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Featured Projects
            </Typography>

            {loading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ color: 'white', fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}>
                  Loading projects...
                </Typography>
              </Box>
            ) : memoizedProjects.length > 0 ? (
              <Grid container spacing={3}>
                {memoizedProjects.map((project, index) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={memoizedProjects.length === 1 ? 12 : memoizedProjects.length === 2 ? 6 : memoizedProjects.length === 3 ? 4 : 3}
                    key={project._id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card
                      onClick={() => handleProjectClick(project)}
                      className="hover-lift"
                      sx={{
                        backgroundColor: "#3a3a3a",
                        borderRadius: "8px",
                        overflow: "hidden",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        height: "100%",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          height: "300px",
                          backgroundImage: project.image ? `url(${project.image})` : "url(/images/featured_projects.svg)",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            backgroundColor: "#D05A34",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          }}
                        >
                          {project.requiresDonation ? "FUNDRAISING" : "ACTIVE"}
                        </Box>
                      </Box>
                      <CardContent sx={{ p: 4 }}>
                        <Typography
                          sx={{ 
                            color: "#D05A34",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            marginBottom: 1,
                            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          }}
                        >
                          {formatDate(project.startDate)}
                        </Typography>
                        
                        {project.requiresDonation && (
                          <Typography
                            sx={{ 
                              color: "#007bff",
                              fontSize: "1.25rem",
                              fontWeight: 700,
                              marginBottom: 1,
                              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                            }}
                          >
                            {formatCurrency(project.currentFunding || 0)}
                            {project.fundraisingGoal && ` / ${formatCurrency(project.fundraisingGoal)}`}
                          </Typography>
                        )}
                        
                        <Typography
                          sx={{ 
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: 600,
                            lineHeight: 1.4,
                            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          }}
                        >
                          {project.title}
                        </Typography>
                        
                        <Typography
                          sx={{ 
                            color: "#cccccc",
                            fontSize: "0.875rem",
                            lineHeight: 1.4,
                            marginTop: 1,
                            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                            whiteSpace: 'pre-wrap'
                          }}
                        >
                          {project.shortDescription}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography sx={{ color: 'white', fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif' }}>
                  No projects available at the moment.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* News and Updates Section */}
        <Box sx={{ backgroundColor: "#121212", py: 8 }}>
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "2rem" },
                color: "white",
                textAlign: "center",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "2px",
                maxWidth: "1200px",
                mx: "auto",
                px: { xs: 2, md: 4 },
              }}
            >
              News and Updates
            </Typography>

            <Box
              sx={{
                backgroundColor: "#3a3a3a",
                borderRadius: 0,
                padding: { xs: 4, md: 6, lg: 8, xl: 10 },
                transition: "transform 0.3s ease",
                transform: "scale(var(--zoom-scale, 1))",
                transformOrigin: "center",
                "&:hover": {
                  transform: "translateY(-5px) scale(var(--zoom-scale, 1))",
                },
                "@media (max-width: 1200px)": {
                  transform: "scale(0.9)",
                  "&:hover": {
                    transform: "translateY(-5px) scale(0.9)",
                  },
                },
                "@media (max-width: 900px)": {
                  transform: "scale(0.8)",
                  "&:hover": {
                    transform: "translateY(-5px) scale(0.8)",
                  },
                },
                "@media (max-width: 600px)": {
                  transform: "scale(0.7)",
                  "&:hover": {
                    transform: "translateY(-5px) scale(0.7)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "1fr 1.2fr" },
                  gap: 6,
                  alignItems: "start",
                }}
              >
                {/* Left Column - Text Content */}
                <Box className="animate-fade-in-left animate-delay-200">
                  <Typography
                    className="animate-fade-in-left animate-delay-300"
                    sx={{
                      color: "#D05A34",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      marginBottom: 2,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontFamily:
                        'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                   sldfdsfnsdjfnsdifbis
                  </Typography>

                  <Typography
                    variant="h3"
                    className="animate-fade-in-left animate-delay-400"
                    sx={{
                      color: "white",
                      fontSize: { xs: "1.75rem", md: "2.25rem" },
                      fontWeight: 400,
                      lineHeight: 1.3,
                      marginBottom: 3,
                      fontFamily:
                        'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    Where Imagination Meets Cultural Pride- And Where The Next
                    Generation Of African Creatives Begin.
                  </Typography>

                  <Typography
                      className="animate-fade-in-left animate-delay-500"
                      sx={{ 
                      color: "#cccccc",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      marginBottom: 4,
                      fontFamily:
                        'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    As Part Of Our Broader Mission To Democratise Access To Arts
                    Education, We're Proud To Introduce, AAAC Kids- A
                    Groundbreaking Initiative Designed To Empower Children Across
                    Africa Through Visual And Creative Arts.
                    </Typography>

                  <Box
                    component="button"
                    onClick={() => {}}
                    className="hover-lift hover-glow animate-fade-in-left animate-delay-600"
                    sx={{
                      backgroundColor: "#D05A34",
                      color: "white",
                      border: "none",
                      padding: "12px 24px",
                      borderRadius: "4px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      fontFamily:
                        'Helvetica, "Helvetica Neue", Arial, sans-serif',
                      "&:hover": {
                        backgroundColor: "#FF6B35",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 25px rgba(255, 107, 53, 0.3)",
                      },
                      }}
                    >
                      Read More
                  </Box>
                </Box>

                {/* Right Column - Image */}
                <Box
                  className="animate-fade-in-right animate-delay-400"
                  sx={{ 
                    height: { xs: "300px", md: "400px" },
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: "url(/images/news.svg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Box>
              </Box>
        </Box>
        </Box>

        {/* Contribute to Our Mission Section */}
        <Box sx={{ backgroundColor: "#121212", py: 8 }}>
          <Box sx={{ width: "100%" }}>
            <Box
              className="hover-lift"
              sx={{
                backgroundColor: "#3a3a3a",
                borderRadius: 0,
                padding: { xs: 4, md: 6, lg: 8, xl: 10 },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: "scale(var(--zoom-scale, 1))",
                transformOrigin: "center",
                "&:hover": {
                  transform: "translateY(-8px) scale(var(--zoom-scale, 1))",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                },
                "@media (max-width: 1200px)": {
                  transform: "scale(0.9)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(0.9)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  },
                },
                "@media (max-width: 900px)": {
                  transform: "scale(0.8)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(0.8)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  },
                },
                "@media (max-width: 600px)": {
                  transform: "scale(0.7)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(0.7)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                  },
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", lg: "1fr 1.2fr" },
                  gap: 6,
                  alignItems: "center",
                }}
              >
                {/* Left Column - Text Content */}
                  <Box>
                  <Typography
                    variant="h3"
                    className="animate-fade-in-left animate-delay-200"
                    sx={{
                      color: "white",
                      fontSize: { xs: "1.75rem", md: "2.25rem" },
                      fontWeight: 600,
                      lineHeight: 1.3,
                      marginBottom: 3,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      fontFamily:
                        'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    Contribute to Our Mission
                    </Typography>

                  <Typography
                    sx={{
                      color: "#e2e8f0",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      marginBottom: 4,
                      fontFamily:
                        'Helvetica, "Helvetica Neue", Arial, sans-serif',
                    }}
                  >
                    Support Our Mission To Preserve And Promote The Cultural
                    Heritage, Art And Languages Of The Indigenous Peoples Of Akwa
                    Ibom State, Nigeria.
                    </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "stretch", gap: 2 }}>
                      <Box
                        component="button"
                        onClick={() => {}}
                        sx={{ 
                          backgroundColor: "#3a3a3a",
                          color: "white",
                          border: "2px solid #D05A34",
                          padding: "12px 24px",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontFamily:
                            'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          minHeight: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        Become a Member
                      </Box>
                      <Box
                        sx={{
                          color: "white",
                          //  padding: "5px 5px",
                          border: "2px solid #D05A34",
                          borderRadius: "4px",
                          display: "flex",
                          minHeight: "48px",
                          width: "48px",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-1px)",
                          },
                        }}
                        onClick={() => {}}
                      >
                        <Box
                          component="img"
                          src="/images/arrow_forward.svg"
                          alt="Arrow Forward"
                          sx={{
                            width: "28px",
                            height: "28px",
                            //  transform: "rotate(45deg)",
                            filter: "brightness(0) invert(1)",
                          }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "stretch", gap: 2 }}>
                      <Box
                        component="button"
                        onClick={() => {}}
                        sx={{ 
                          backgroundColor: "#3a3a3a",
                          color: "white",
                          border: "2px solid #D05A34",
                          padding: "12px 24px",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          fontFamily:
                            'Helvetica, "Helvetica Neue", Arial, sans-serif',
                          minHeight: "48px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        DONATE
                      </Box>
                      <Box
                        sx={{
                          color: "white",
                          //  padding: "12px 16px",
                          border: "2px solid #D05A34",
                          borderRadius: "4px",
                          display: "flex",
                          minHeight: "48px",
                          width: "48px",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-1px)",
                          },
                        }}
                        onClick={() => {}}
                      >
                        <Box
                          component="img"
                          src="/images/arrow_forward.svg"
                          alt="Arrow Forward"
                          sx={{
                            width: "28px",
                            height: "28px",
                            //  transform: "rotate(-45deg)",
                            filter: "brightness(0) invert(1)",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Right Column - Image */}
                <Box
                  sx={{
                    height: { xs: "300px", md: "400px" },
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${ImagePresets.hero('https://res.cloudinary.com/dgsctl247/image/upload/v1754788170/john_1_jkqzqh.jpg')})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Our Valued Collaborators Section */}
        <Box sx={{ backgroundColor: "#121212" }}>
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
                fontWeight: 600,
                fontSize: { xs: "1.5rem", md: "2rem" },
                color: "white",
                textAlign: "center",
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: "2px",
                maxWidth: "1200px",
                mx: "auto",
                px: { xs: 2, md: 4 },
              }}
            >
              Our Valued Collaborators
            </Typography>

            <Box
              sx={{
                backgroundColor: "#3a3a3a",
                borderRadius: 0,
                height: "180px",
                //  padding: { xs: "5px 4", md: "5px 6", lg: "5px 8", xl: "5px 10" },
                transform: "scale(var(--zoom-scale, 1))",
                transformOrigin: "center",
                "@media (max-width: 1200px)": {
                  transform: "scale(0.9)",
                },
                "@media (max-width: 900px)": {
                  transform: "scale(0.8)",
                },
                "@media (max-width: 600px)": {
                  transform: "scale(0.7)",
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(8, 1fr)",
                  },
                  gap: 4,
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {[
                  { name: "Creathe", src: "/collaborators/creathe.svg" },
                  { name: "RUNAM", src: "/collaborators/RUNAM.svg" },
                  { name: "AAAC", src: "/collaborators/AAAC_White.svg" },
                  {
                    name: "Embassy of Sweden",
                    src: "/collaborators/Embassy_of_Sweden_Abuja_logo.svg",
                  },
                  { name: "Ekpuk", src: "/collaborators/ekpuk.svg" },
                  {
                    name: "Yemisi Shyllon Museum",
                    src: "/collaborators/Yemisi_Shyllon_Museum_of_Art_Logo.svg",
                  },
                  {
                    name: "Ibom Heritage",
                    src: "/collaborators/ibom_heritage.svg",
                  },
                  { name: "Truth", src: "/collaborators/truth.svg" },
                ].map((collaborator, index) => (
                  <Box
                    key={index}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    sx={{
                      padding: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src={collaborator.src}
                      alt={collaborator.name}
                      className="hover-scale"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "1000px",
                        width: "auto",
                        height: "auto",
                        //  filter: "brightness(0) invert(1)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          //  filter: "brightness(0) invert(1) sepia(1) hue-rotate(25deg) saturate(2)",
                          transform: "scale(1.15)",
                          filter: "brightness(1.1) drop-shadow(0 4px 8px rgba(255, 107, 53, 0.3))",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default Home; 
