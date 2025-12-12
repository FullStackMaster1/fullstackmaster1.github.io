import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "./CourseCard";
import coursesData from "@/data/courses.json";
import { SiUdemy, SiPluralsight } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export default function CoursesCarousel() {
  const udemyAutoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  
  const pluralsightAutoplay = useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section
      id="courses"
      className="py-10 md:py-14 bg-muted/30"
      data-testid="section-courses"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="secondary">
              <GraduationCap className="w-3 h-3 mr-1" />
              Online Courses
            </Badge>
            <Badge variant="outline" className="text-primary border-primary/30">
              Paid
            </Badge>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            data-testid="text-courses-title"
          >
            Online Courses
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn at your own pace with my comprehensive courses on Udemy and
            Pluralsight.
          </p>
        </div>

        <Tabs defaultValue="pluralsight" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger
              value="pluralsight"
              className="flex items-center gap-2"
              data-testid="tab-pluralsight"
            >
              <SiPluralsight className="w-4 h-4" />
              Pluralsight ({coursesData.pluralsight.length})
            </TabsTrigger>
            <TabsTrigger
              value="udemy"
              className="flex items-center gap-2"
              data-testid="tab-udemy"
            >
              <SiUdemy className="w-4 h-4" />
              Udemy ({coursesData.udemy.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pluralsight">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[pluralsightAutoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {coursesData.pluralsight.map((course) => (
                  <CarouselItem
                    key={course.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <CourseCard
                      title={course.title}
                      url={course.url}
                      thumbnail={course.thumbnail}
                      students={course.students}
                      rating={course.rating}
                      platform="pluralsight"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12" data-testid="button-pluralsight-prev" />
                <CarouselNext className="-right-12" data-testid="button-pluralsight-next" />
              </div>
            </Carousel>
          </TabsContent>

          <TabsContent value="udemy">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[udemyAutoplay.current]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {coursesData.udemy.map((course) => (
                  <CarouselItem
                    key={course.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <CourseCard
                      title={course.title}
                      url={course.url}
                      thumbnail={course.thumbnail}
                      students={course.students}
                      rating={course.rating}
                      platform="udemy"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="-left-12" data-testid="button-udemy-prev" />
                <CarouselNext className="-right-12" data-testid="button-udemy-next" />
              </div>
            </Carousel>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
