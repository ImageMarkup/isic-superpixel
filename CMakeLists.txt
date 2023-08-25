cmake_minimum_required(VERSION 3.16)
project(isic-superpixel LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)

if(EMSCRIPTEN)
  set(io_components
   )
elseif(WASI)
  set(io_components
    ITKIOJPEG
    ITKIOPNG
    )
else()
  set(io_components
    ITKImageIO
    )
endif()
find_package(ITK REQUIRED
  COMPONENTS
    ${io_components}
    ITKSuperPixel
    WebAssemblyInterface
  )
include(${ITK_USE_FILE})

add_executable(isic-superpixel isic-superpixel.cxx)
target_link_libraries(isic-superpixel PUBLIC ${ITK_LIBRARIES})

enable_testing()
add_test(NAME isic-superpixel-test
  COMMAND isic-superpixel
    ${CMAKE_CURRENT_SOURCE_DIR}/images/ISIC_0016082.JPG
    ${CMAKE_CURRENT_BINARY_DIR}/ISIC_0016082-superpixels.png
  )