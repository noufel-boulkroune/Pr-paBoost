"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/Tabs";
import { useCourse } from "@/features/courses/hooks/useCourses";
import { Avatar } from "@/components/ui/Avatar";
import { CourseCardSkeleton } from "@/components/ui/Skeleton";
import { formatPrice, formatDuration } from "@/lib/utils";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const { course, isLoading, error } = useCourse(courseId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CourseCardSkeleton />
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-surface-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md font-bold text-text-primary mb-4">
            Course not found
          </h1>
          <p className="text-body-md text-text-secondary mb-6">
            The course you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/public/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-1">
      {/* Hero Section */}
      <div className="bg-surface-2 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                {course.categories.map((cat) => (
                  <Badge key={cat.id} variant="outline" size="sm">
                    {cat.name}
                  </Badge>
                ))}
                <Badge variant="primary" size="sm">
                  {course.level}
                </Badge>
              </div>

              <h1 className="text-display-md lg:text-display-lg font-bold text-text-primary mb-4">
                {course.title}
              </h1>

              <p className="text-body-lg text-text-secondary mb-6">
                {course.shortDescription || course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-warning-500 font-bold">{course.rating.toFixed(1)}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(course.rating)
                            ? "text-warning-500"
                            : "text-surface-3"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-body-sm text-text-muted">
                    ({course.reviewCount} ratings)
                  </span>
                </div>
                <span className="text-body-sm text-text-secondary">
                  {course.enrollmentCount.toLocaleString()} students enrolled
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Avatar
                  src={course.instructor.avatar}
                  name={`${course.instructor.firstName} ${course.instructor.lastName}`}
                  size="md"
                />
                <div>
                  <p className="text-body-sm text-text-muted">Created by</p>
                  <p className="text-body-md font-medium text-text-primary">
                    {course.instructor.firstName} {course.instructor.lastName}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <div className="relative aspect-video rounded-t-xl overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  {course.trailerUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-text-primary/30">
                      <button className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                        <svg className="w-6 h-6 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-display-sm font-bold text-text-primary">
                      {formatPrice(course.price, course.currency)}
                    </span>
                    {course.compareAtPrice && (
                      <span className="text-body-lg text-text-muted line-through">
                        {formatPrice(course.compareAtPrice, course.currency)}
                      </span>
                    )}
                  </div>

                  <Button className="w-full" size="lg">
                    Enroll Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Add to Wishlist
                  </Button>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-body-sm text-text-secondary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDuration(course.totalDuration)} of content
                    </div>
                    <div className="flex items-center gap-3 text-body-sm text-text-secondary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {course.totalLessons} lessons
                    </div>
                    <div className="flex items-center gap-3 text-body-sm text-text-secondary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      {course.language}
                    </div>
                    <div className="flex items-center gap-3 text-body-sm text-text-secondary">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Certificate of completion
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview">
              <TabList>
                <TabTrigger value="overview">Overview</TabTrigger>
                <TabTrigger value="curriculum">Curriculum</TabTrigger>
                <TabTrigger value="instructor">Instructor</TabTrigger>
                <TabTrigger value="reviews">Reviews</TabTrigger>
              </TabList>

              <TabContent value="overview">
                <div className="prose max-w-none">
                  <h3 className="text-heading-lg font-semibold text-text-primary mb-4">
                    About this course
                  </h3>
                  <p className="text-body-md text-text-secondary whitespace-pre-line">
                    {course.description}
                  </p>

                  {course.learningOutcomes.length > 0 && (
                    <>
                      <h4 className="text-heading-md font-semibold text-text-primary mt-8 mb-4">
                        What you&apos;ll learn
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {course.learningOutcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-body-md text-text-secondary">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {course.requirements.length > 0 && (
                    <>
                      <h4 className="text-heading-md font-semibold text-text-primary mt-8 mb-4">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                            <span className="text-body-md text-text-secondary">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </TabContent>

              <TabContent value="curriculum">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-heading-lg font-semibold text-text-primary">
                      Course Content
                    </h3>
                    <span className="text-body-sm text-text-secondary">
                      {course.totalLessons} lessons • {formatDuration(course.totalDuration)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {course.sections.map((section, sectionIndex) => (
                      <Card key={section.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-heading-md font-semibold text-text-primary">
                              Section {sectionIndex + 1}: {section.title}
                            </h4>
                            <span className="text-caption text-text-muted">
                              {section.lessons.length} lessons
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <li
                                key={lesson.id}
                                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-surface-2"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-caption text-text-muted w-6">
                                    {lessonIndex + 1}
                                  </span>
                                  <span className="text-body-sm text-text-primary">
                                    {lesson.title}
                                  </span>
                                  {lesson.isPreview && (
                                    <Badge variant="secondary" size="sm">Preview</Badge>
                                  )}
                                </div>
                                <span className="text-caption text-text-muted">
                                  {formatDuration(lesson.duration)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabContent>

              <TabContent value="instructor">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar
                        src={course.instructor.avatar}
                        name={`${course.instructor.firstName} ${course.instructor.lastName}`}
                        size="xl"
                      />
                      <div className="flex-1">
                        <h3 className="text-heading-lg font-semibold text-text-primary">
                          {course.instructor.firstName} {course.instructor.lastName}
                        </h3>
                        <p className="text-body-md text-text-secondary mt-1">
                          {course.instructor.bio || "Experienced instructor passionate about teaching."}
                        </p>
                        <div className="flex items-center gap-6 mt-4">
                          {course.instructor.totalStudents && (
                            <div className="text-center">
                              <div className="text-heading-md font-bold text-text-primary">
                                {course.instructor.totalStudents.toLocaleString()}
                              </div>
                              <div className="text-caption text-text-muted">Students</div>
                            </div>
                          )}
                          {course.instructor.totalCourses && (
                            <div className="text-center">
                              <div className="text-heading-md font-bold text-text-primary">
                                {course.instructor.totalCourses}
                              </div>
                              <div className="text-caption text-text-muted">Courses</div>
                            </div>
                          )}
                          {course.instructor.rating && (
                            <div className="text-center">
                              <div className="text-heading-md font-bold text-text-primary">
                                {course.instructor.rating.toFixed(1)}
                              </div>
                              <div className="text-caption text-text-muted">Rating</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabContent>

              <TabContent value="reviews">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-body-md text-text-secondary">
                      Reviews will be displayed here
                    </p>
                  </CardContent>
                </Card>
              </TabContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
